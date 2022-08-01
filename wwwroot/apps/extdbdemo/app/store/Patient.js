Ext.define("ExtDbDemo.store.Patient", {
    requires: [
        "ExtDbDemo.model.Patient"
    ],
    extend: "Ext.data.Store",
    alias: "store.patient",
    model: "ExtDbDemo.model.Patient",
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: Ext.getResourcePath('patients.json'),
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
