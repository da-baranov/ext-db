Ext.define('ExtDbDemo.view.asyncmessageboxes.AsyncMessageBoxesView', {
    requires: ["ExtDb.MessageBox"],
    alias: "widget.asyncmessageboxesview",
    extend: "Ext.panel.Panel",
    title: "Async message boxes",
    layout: "border",
    items: [
        {
            xtype: "panel",
            region: "center",
            tbar: [
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
                        if (name) alert(`Hello ${name}!`);
                    },
                    iconCls: "fa fa-terminal"
                    
                },
                {
                    xtype: 'button',
                    text: 'Confirm',
                    handler: async function () {
                        const mr = await ExtDb.MessageBox.confirm("Confirm", "Exit program?");
                    },
                    iconCls: "fa fa-question-circle"
                }
            ]
        }
    ]
})