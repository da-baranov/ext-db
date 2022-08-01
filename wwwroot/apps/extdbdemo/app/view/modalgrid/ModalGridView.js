Ext.define('ExtDbDemo.view.modalgrid.ModalGridView',{
    extend: 'Ext.panel.Panel',
    title: "Modal dictionary dialog UX, triggers, hotkeys",
    requires: [
        'ExtDbDemo.view.modalgrid.ModalGridViewController',
        'ExtDbDemo.view.modalgrid.ModalGridViewModel'
    ],

    alias: "widget.modalgridview",
    controller: 'modalgridview',
    viewModel: {
        type: 'modalgridview'
    },

    defaultFocus: "textfield",

    layout: "center",
    items: [
        {
            xtype: "container",
            layout: "vbox",
            items: [
                {
                    xtype: "textfield",
                    width: 400,
                    labelWidth: 100,
                    fieldLabel: "Patient",
                    enableKeyEvents: true,
                    triggers: {
                        button: {
                            handler: 'selectPatient',
                            cls: 'x-form-search-trigger'
                        }
                    },
                    bind: {
                        value: '{patient.firstName} {patient.lastName}'
                    },
                    listeners: {
                        keydown: function (sender, e) {
                            if (e.getKey() === Ext.event.Event.F4) {
                                sender.up("panel").getController().selectPatient();
                                e.preventDefault();
                                return false;
                            }
                        }
                    }
                },
                {
                    xtype: "container",
                    width: 400,
                    padding: 10,
                    html: "A simple keyboard-friendly input field with a lookup button. Click the lookup button or press F4 to open a modal lookup dialog and to choose some value"
                }
            ]
        }
    ]
});
