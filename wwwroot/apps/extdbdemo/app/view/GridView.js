Ext.define("ExtDbDemo.view.GridView", {
    requires: [ 
        "ExtDb.grid.Panel",
        "ExtDb.component.AceCodeEditor",
        "ExtDbDemo.view.GridViewController",
        "ExtDbDemo.view.GridViewModel"
    ],
    extend: "Ext.panel.Panel",
    title: "Complete CRUD (Grid + Modal Form) example",
    alias: "widget.extdbdemogridview",
    controller: "gridviewcontroller",
    viewModel: "gridviewmodel",

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
                    text: 'Insert',
                    tooltip: "INS",
                    handler: "createPatient"
                },
                {
                    iconCls: 'fa fa-edit',
                    text: 'Edit',
                    tooltip: "F4",
                    bind: {
                        disabled: "{!selection}"
                    },
                    handler: "editPatient"
                },
                {
                    iconCls: 'fa fa-trash',
                    text: 'Delete',
                    tooltip: "DEL",
                    bind: {
                        disabled: "{!selection}"
                    },
                    handler: "deletePatients"
                },
                {
                    iconCls: 'fas fa-sync',
                    text: "Refresh",
                    tooltip: "F5",
                    handler: "refreshPatients"
                },
                '-',
                {
                    xtype: "label",
                    bind: {
                        text: " {checked.length} record(s) checked"
                    }
                }
            ],

            bind: {
                store: "{patients}",
                selection: "{selection}",
                checked: "{checked}"
            },

            columns: [
                {
                    text: "First Name",
                    dataIndex: "firstName",
                    flex: 2
                },
                {
                    text: "Last Name",
                    dataIndex: "lastName",
                    flex: 2
                },
                {
                    xtype: "datecolumn",
                    format: "d.m.Y",
                    text: "Birth Date/Time",
                    dataIndex: "birthTime",
                    flex: 1
                },
                {
                    text: "Gender",
                    dataIndex: "gender",
                    flex: 1
                },
            ],
        },
        {
            region: 'south',
            height: 40,
            bodyPadding: 8,
            split: true,
            html: 'A full CRUD example'
        },
        {
            xtype: "tabpanel",
            region: "south",
            height: 400,
            items: [
                // 0
                {
                    title: "GridView.js",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/extdbdemo/app/view/GridView.js"
                        }
                    ]
                },
                // 1
                {
                    title: "ModalViewController.js",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/packages/local/ext-db/src/app/ModalViewController.js"
                        }
                    ]
                },
                // 2
                {
                    title: "ModalViewModel.js",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/packages/local/ext-db/src/app/ModalViewModel.js"
                        }
                    ]
                }
            ]
        }
    ]
});