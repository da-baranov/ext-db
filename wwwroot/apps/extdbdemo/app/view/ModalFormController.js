Ext.define('ExtDbDemo.view.ModalFormController', {
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

        // Emulate model saving
        /*
        record.save({
            callback: function (r, operation, success) {
                if (!success) {
                    const error = ExtDb.Error.toError(operation);
                    ExtDb.MessageBox.error("Error", error.message);
                } else {
                    me.callParent(arguments);            
                }
            }
        });
        */
        me.callParent(arguments);
    }
});
