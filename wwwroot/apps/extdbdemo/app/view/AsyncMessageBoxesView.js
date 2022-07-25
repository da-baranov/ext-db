Ext.define('ExtDbDemo.view.AsyncMessageBoxesView', {
    requires: [
        'ExtDb.MessageBox'
    ],

    alias: 'widget.asyncmessageboxesview',
    extend: 'Ext.panel.Panel',
    title: 'Async message boxes',

    layout: {
        type: 'center'
    },

    items: [
        {
            xtype: "container",
            defaults: {
                margin: 2
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Error',
                    handler: async function () {
                        await ExtDb.MessageBox.error("Error", "Some error message");
                    },
                    iconCls: "fa fa-exclamation-circle"
                },
                {
                    xtype: 'button',
                    text: 'Alert',
                    handler: async function () {
                        await ExtDb.MessageBox.alert("Alert", "Some message");
                    },
                    iconCls: "fa fa-exclamation-triangle"
                },
                {
                    xtype: 'button',
                    text: 'Prompt',
                    handler: async function () {
                        const name = await ExtDb.MessageBox.prompt("Name", "Enter your name");
                        alert(name);
                    },
                    iconCls: "fa fa-terminal"
                    
                },
                {
                    xtype: 'button',
                    text: 'Confirm',
                    handler: async function () {
                        const mr = await ExtDb.MessageBox.confirm("Confirm", "Exit program?");
                        alert(mr);
                    },
                    iconCls: "fa fa-question-circle"
                }
            ]
        }
    ]
})