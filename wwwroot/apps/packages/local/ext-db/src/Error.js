Ext.define("ExtDb.Error", {
    requires: [
        "ExtDb.ErrorMessageBox"
    ],
    statics: {
        _prevExtErrorHandler: undefined,
        _prevWindowErrorHandler: undefined,

        _extErrorHandler: function (err) {
            const error = ExtDb.Error.toError(err);
            ExtDb.Error.errorMessageBox(error);
        },

        _windowErrorHandler: function (event) {
            const error = ExtDb.Error.toError(event);
            ExtDb.Error.errorMessageBox(error);
        },

        toError: function (e) {
            // Undefined
            if (!e) {
                return new Error("Unexpected error");
            }

            // String
            if (typeof e === "string" || e instanceof String) {
                return new Error(e);
            }

            // Error object - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
            if (e instanceof Error) {
                return e;
            }

            // ErrorEvent object - see https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event
            if (e instanceof ErrorEvent) {
                return e.error;
            }

            // XMLHTTPRequest.response? - see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            if (e.responseText) {
                let json = null;
                try {
                    json = JSON.parse(e.responseText);
                }
                catch (jex) {
                    json = undefined;
                }
                if (json && json.message) {
                    return new Error(json.message);
                }
                return new Error(e.responseText);
            }

            // Ext.Error
            if (e instanceof Ext.Error) {
                return new Error(e.toString());
            }

            // Ext.form.action.Action
            if (e instanceof Ext.form.action.Action) {
                if (e.result && e.result.message) {
                    return new Error(e.result.message);
                }
            }

            // Ext.data.Batch
            if (e instanceof Ext.data.Batch) {
                const exceptions = e.getExceptions();
                if (exceptions.length !== 0) {
                    return this.extractError(exceptions[0]);
                }
            }

            // Ext.Operation
            if (e instanceof Ext.data.operation.Operation) {
                const error = e.getError();
                if (!error) {
                    return new Error(
                        "Unexpected error of type Operation (operation.error == null)"
                    );
                }
                if (error.response) {
                    const response = error.response;
                    if (response.responseJson) {
                        const result = new Error(response.responseJson.message);
                        result.stack = response.responseJson.stack;
                        return result;
                    }
                    if (response.responseText) {
                        return new Error(response.responseText);
                    }
                    if (response.statusText) {
                        return new Error(response.statusText + " " + response.status);
                    }
                    if (response.status) {
                        return new Error("HTTP Error " + response.status);
                    }
                    return new Error(
                        "Unexpected error of type Operation (error.response.responseJson == null, error.response.responseText == null)"
                    );
                } else {
                    return new Error(
                        "Unexpected error of type Operation (error.response == null)"
                    );
                }
            }

            // Something else with a known property @message
            var err;
            if (e.message) {
                err = new Error(e.message);
                err.stack = e.stack || e.stackTrace;
                return err;
            }

            // Something else with a known property @msg
            if (e.msg) {
                err = new Error(e.msg);
                if (e.stack) err.stack = e.stack;
                return err;
            }

            console.log("Unknown error: " + e);
            return new Error("Unknown error: " + e);
        },

        raiseError: function (e) {
            const error = this.toError(e);
            if (error) throw error;
        },

        errorMessageBox: function (e) {
            const error = this.toError(e);
            const messageBox = new ExtDb.ErrorMessageBox({ message: error.message, stack: error.stack });
            messageBox.show();
        },

        enableGlobalExceptionHandler: function () {
            this._prevExtErrorHandler = Ext.Error.handle;
            Ext.Error.handle = this._extErrorHandler;
            window.addEventListener("error", this._windowErrorHandler);
        },

        disableGlobalExceptionHandler: function () {
            if (this._prevExtErrorHandler) {
                Ext.Error.handle = this._prevExtErrorHandler;
            }
            window.removeEventListener("error", this._windowErrorHandler);
        }
    }
});