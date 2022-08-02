Ext.define('ExtDbDemo.view.gridcrud.ModalForm',{
    extend: 'Ext.window.Window',
    alias: "widget.modalform",
    modal: true,
    width: 600,
    height: 200,
    title: "Patient",

    requires: [
        'ExtDbDemo.view.gridcrud.ModalFormController',
        'ExtDbDemo.view.gridcrud.ModalFormModel'
    ],

    layout: "border",

    controller: 'modalform',
    viewModel: {
        type: 'modalform'
    },

    defaultFocus: "txtFirstName",

    items: [
        {
            xtype: "form",
            bodyPadding: 10,
            reference: "form",
            region: "center",
            fieldDefaults: {
                msgTarget: 'side',
                allowBlank: false
            },
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: "First Name",
                    itemId: "txtFirstName",
                    anchor: "100%",
                    bind: {
                        value: "{record.firstName}"
                    }
                },
                {
                    xtype: "textfield",
                    fieldLabel: "Last Name",
                    itemId: "txtLastName",
                    anchor: "100%",
                    bind: {
                        value: "{record.lastName}"
                    },
                    msgTarget: 'side'
                },
                {
                    xtype: "datefield",
                    fieldLabel: "Birth Date/Time",
                    format: "d.m.Y",
                    bind: {
                        value: "{record.birthTime}"
                    },
                    msgTarget: 'side'
                },
                {
                    xtype: "combobox",
                    fieldLabel: "Gender",
                    displayField: "display",
                    valueField: "code",
                    queryLocal: true,
                    bind: {
                        value: "{record.gender}",
                        store: "{genders}"
                    },
                    msgTarget: 'side'
                }
            ],

            listeners: {
                render: function () {
                    this.isValid();
                }
            }
        }
    ],

    fbar: [
        {
            text: "OK",
            bind: {
                disabled: "{!formValid}"
            },
            handler: "saveRecord"
        },
        {
            text: "Cancel",
            handler: "cancelRecord"
        }
    ]
});
