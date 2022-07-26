Ext.define("ExtDbDemo.view.GridView", {
    requires: [ 
        "ExtDb.grid.Panel",
        "ExtDb.component.AceCodeEditor"
    ],
    extend: "Ext.panel.Panel",
    title: "Grid panel mixin",
    alias: "widget.extdbdemogridview",
    layout: "border",
    defaultFocus: "dgr",
    items: [
        {
            xtype: "extdbgrid",
            region: "center",
            itemId: "dgr",
            tbar: [
                {
                    iconCls: 'fa fa-plus',
                    text: 'Insert (INS)'
                },
                {
                    iconCls: 'fa fa-edit',
                    text: 'Edit (ENTER)'
                },
                {
                    iconCls: 'fa fa-trash',
                    text: 'Delete (DEL)'
                },
                {
                    iconCls: 'fas fa-sync',
                    text: "Refresh (F5)",
                    handler: function () {
                        this.up("grid").getStore().reload();
                    }
                }
            ],

            store: {
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'json/people.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            },

            columns: [
                {
                    text: "First Name",
                    dataIndex: "firstName",
                    width: 200,
                },
                {
                    text: "Last Name",
                    dataIndex: "lastName",
                    flex: 1
                }
            ],

            listeners: {
                oninsert: function (sender, record, element, rowindex) {
                    Ext.toast('INS key has been pressed');
                },
                onedit: function (sender, record, element, rowindex) {
                    Ext.toast('ENTER key has been pressed');
                },
                ondelete: function (sender, record, element, rowindex) {
                    Ext.toast('DEL key has been pressed');
                },
                onrefresh: function () {
                    Ext.toast('F5 key has been pressed');
                }
            }
        },
        {
            region: 'south',
            height: 40,
            bodyPadding: 8,
            html: 'A simple mixin that improves Grid UX. First row is always selected, standard keyboard shortcuts (INS, DEL, ENTER, F5) are assigned.'
        },
        {
            title: "Source",
            layout: "fit",
            region: "south",
            height: 300,
            split: true,
            items: [
                {
                    xtype: "acecodeeditor",
                    mode: "javascript",
                    url: "apps/extdbdemo/app/view/GridView.js"
                }
            ]
        }
    ]
});