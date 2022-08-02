Ext.define('ExtDbDemo.view.globalex.GlobalExController', {
    requires: ['ExtDb.Error'],
    extend: 'Ext.app.ViewController',
    alias: 'controller.globalex',

    enableGEH: function () {
        ExtDb.Error.enableGlobalExceptionHandler();
    },

    disableGEH: function () {
        ExtDb.Error.disableGlobalExceptionHandler();
    },

    throwWindowEx: function () {
        throw new Error("Javascript Error");
    },

    throwExtEx: function () {
        Ext.raise("ExtJs Error");
    }
});
