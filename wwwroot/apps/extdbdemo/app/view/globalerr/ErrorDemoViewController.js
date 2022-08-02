Ext.define('ExtDbDemo.view.globalerr.ErrorDemoViewController', {
    requires: [
        "ExtDb.Error",
        "ExtDb.ErrorMessageBox"
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.errordemoview',

    throwString: function () {
        try {
            throw "A string has been thrown and caught";
        }
        catch (e) {
            ExtDb.Error.errorMessageBox(e);
        }
    },

    throwNumber: function () {
        try {
            throw 100;
        }
        catch (e) {
            ExtDb.Error.errorMessageBox(e);
        }
    },

    throwError: function () {
        try {
            throw new Error("A javascript Error has been thrown and caught");
        }
        catch (e) {
            ExtDb.Error.errorMessageBox(e);
        }
    },

    throwExtError: function () {
        try {
            Ext.raise("An instance of Ext.Error has been thrown and caught");
        }
        catch (e) {
            ExtDb.Error.errorMessageBox(e);
        }
    },

    catchStoreError: function () {
        const store = this.getViewModel().getStore("patients");
        store.load({
            callback: function (records, operation, success) {
                if (!success) {
                    ExtDb.Error.errorMessageBox(operation);
                }
            }
        });
    }
});
