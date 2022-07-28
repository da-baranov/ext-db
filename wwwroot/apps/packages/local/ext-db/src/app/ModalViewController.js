Ext.define('ExtDb.app.ModalViewController', {
    requres: ['ExtDb.Error'],
    extend: 'Ext.app.ViewController',

    _forceClose: false,
    _confirmMessage: "You are closing a form that has unsaved changes. Do you want to save changes?",

    control: {
        "#": {
            // Modal form close event handler
            beforeclose: function () {
                const view = this.getView();
                return this.handleModalFormClosing();
            }
        },
        "form": {
            // Form panel validity change event handler
            validitychange: function (sender, valid) {
                this.getViewModel().set("formValid", valid);
            }
        }
    },

    isFormValid() {
        const view = this.getView();
        if (!view) return true;

        const forms = view.query("form");
        if (!forms || !Array.isArray(forms) || !forms.length) return true;

        for (var i = 0; i < forms.length; i++) {
            const form = forms[i];
            const formValid = form.isValid();
            if (!formValid) return false;
        }

        return true;
    },

    /**
     * @private
     * 
     */
    hasChanges: function () {

        const me = this;

        if (me._forceClose) return false;

        const viewModel = me.getViewModel();
        if (!viewModel) {
            return false;
        }

        const data = viewModel.getData();
        if (data) {
            for (const key in data) {
                const value = viewModel.get(key);
                if (value instanceof Ext.data.Model) {
                    const modelChanges = value.getChanges();
                    if (modelChanges && Object.keys(modelChanges) && Object.keys(modelChanges).length) {
                        return true;
                    }
                }
            }
        }

        const stores = viewModel.stores;
        if (stores) {
            for (const key in stores) {
                const store = viewModel.getStore(key);
                if (store instanceof Ext.data.Store) {
                    const a = store.getNewRecords();
                    if (a && a.length) return true;
                    const b = store.getUpdatedRecords();
                    if (b && b.length) return true;
                    const c = store.getRemovedRecords();
                    if (c && c.length) return true;
                }
            }
        }

        return false;
    },

    handleModalFormClosing: function () {
        const me = this;
        const view = me.getView();

        if (view.allowClose) {
            return true;
        }

        // Form is invalid - show confirmation
        if (me.isFormValid() === false) {
            Ext.Msg.show({
                title: "Question",
                message: "Form has invalid values. Close anyway?",
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === "yes") {
                        view.allowClose = true;
                        view.close();
                        
                    } else {
                        view.allowClose = false;
                    }
                }
            });
            return false;
        }
        
        if (me.hasChanges() === true) {
            Ext.Msg.show({
                title: "Question",
                message: me._confirmMessage,
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === "yes") {
                        try {
                            me.saveRecord(); // => view.allowClose = true; view.close();
                        }
                        catch (saveex) {
                            ExtDb.MessageBox.error(saveex.message);
                            view.allowClose = false;
                        }

                    } else if (btn === "no") {
                        view.allowClose = true;
                        view.close();

                    } else if (btn === "cancel") {
                        view.allowClose = false;
                    }
                }
            });
            return false;
        }

        view.allowClose = true;
        view.close();
        return false;
    },

    /**
     * @
     * 
     * @virtual
     * @protected
     */
    getRecord: function () {
        const viewModel = this.getViewModel();
        if (viewModel) {
            return viewModel.get("record");
        }
        return undefined;
    },

    setRecord: function (record) {
        const viewModel = this.getViewModel();
        if (viewModel) {
            viewModel.set("record", record);
        }
    },

    /**
     * @public
     * @virtual
     * 
     * Intitiates the process of creating a new record
     * @param {any} args 
     */
    createRecord: function (args) {
        // Base implementation
        const viewModel = this.getViewModel();
        if (viewModel && args) {
            this.setRecord(args);
        }
    },

    /**
     * Initiates the process of editing data in a modal form
     * 
     * @public
     * @virtual
     * @param {any} args - the model to be edited
     * @param {string} name - the name of the variable to store the model
     */
    editRecord: function (args) {
        // Base implementation
        const viewModel = this.getViewModel();
        if (viewModel && args) {
            this.setRecord(args);
        }
    },

    /**
     * Saves changes
     * @virtual
     * @returns boolean
     * 
     */
    saveRecord: function () {
        const record = this.getRecord();

        // Mark record unchanged
        record.endEdit();
        record.dirty = false;

        // Fire events to notify caller
        this.fireEvent("saved", this, record);
        const view = this.getView();
        if (view) view.fireEvent("saved", view, record);

        // Close view
        view.allowClose = true;
        view.close();
    },

    /**
     * Closes the form 
     * @virtual
     * @returns void
     */
    cancelRecord: function () {
        const view = this.getView();
        if (view && view.close) {
            view.close();
        }
    }
});
