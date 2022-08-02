Ext.define('ExtDbDemo.view.gridcrud.ModalFormController', {
    requres: [
        "ExtDb.app.ModalViewController",
        "ExtDb.Error",
        "ExtDb.MessageBox"
    ],

    extend: 'ExtDb.app.ModalViewController',
    alias: 'controller.modalform',

    saveRecord: function () {
        const me = this;

        const record = this.getRecord();
        if (!record) {
            return;
        }
        me.callParent(arguments);
    }
});
