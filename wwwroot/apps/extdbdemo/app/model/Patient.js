Ext.define('ExtDbDemo.model.Patient', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'firstName', type: 'string', allowNull: false },
        { name: 'lastName', type: 'string', allowNull: false },
        { name: 'gender', type: 'string', allowNull: false },
        { name: 'birthTime', type: 'date', dateFormat: "c", allowNull: false }
    ]
});
