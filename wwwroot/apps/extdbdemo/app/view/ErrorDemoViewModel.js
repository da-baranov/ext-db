Ext.define('ExtDbDemo.view.ErrorDemoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.errordemoview',
    data: {
        name: 'ExtDbDemo'
    },

    stores: {
        patients: {
            model: "ExtDbDemo.model.Patient",
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'ajax',
                url: Ext.getResourcePath('patients1.json'), // HTTP 404
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});
