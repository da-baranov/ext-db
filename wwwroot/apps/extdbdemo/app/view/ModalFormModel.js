Ext.define('ExtDbDemo.view.ModalFormModel', {
    extend: 'ExtDb.app.ModalViewModel',
    alias: 'viewmodel.modalform',

    stores: {
        genders: {
            data: [
                { code: "M", display: "Male" },
                { code: "F", display: "Female" },
                { code: "O", display: "Other" }
            ]
        }
    },

    constructor: function () {
        this.callParent(arguments);
        const model = Ext.create('ExtDbDemo.model.Patient');
        this.set("record", model);
    }

});
