Ext.define('ExtDbDemo.view.GridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridviewmodel',
    requires: [
        "ExtDbDemo.store.Patient"
    ],

    data: {
        selection: undefined,           // Grid selected record
        checked: []                     // Grid checked records
    },

    stores: {
        patients: {
            type: "patient"
        }
    }
});
