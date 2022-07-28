Ext.define('ExtDbDemo.view.GridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridviewmodel',

    data: {
        selection: undefined,           // Grid selected record
        checked: []                     // Grid checked records
    },

    stores: {
        patients: {
            model: "ExtDbDemo.model.Patient",
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                url: Ext.getResourcePath('patients.json'),
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});
