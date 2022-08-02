Ext.define('ExtDbDemo.view.globalex.GlobalExView',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ExtDbDemo.view.globalex.GlobalExController',
        'ExtDbDemo.view.globalex.GlobalExModel'
    ],

    controller: 'globalex',
    viewModel: {
        type: 'globalex'
    },
    alias: "widget.globalexview",
    layout: "border",

    items: [
        {
            xtype: "panel",
            region: "center",
            layout: "center",
            items: [
                {
                    xtype: "container",
                    layout: {
                        type: "table",
                        columns: 3
                    },
                    items: [
                        {
                            xtype: "button",
                            text: "Enable global exception handlers",
                            handler: "enableGEH"
                        },
                        {
                            xtype: "button",
                            text: "Test: throw window exception",
                            handler: "throwWindowEx"
                        },
                        {
                            xtype: "button",
                            text: "Test: throw ExtJS error",
                            handler: "throwExtEx"
                        },
                        {
                            xtype: "button",
                            text: "Disable global exception handlers",
                            handler: "disableGEH"
                        },
                        {
                            xtype: "button",
                            text: "Test: throw window exception",
                            handler: "throwWindowEx"
                        },
                        {
                            xtype: "button",
                            text: "Test: throw ExtJS error",
                            handler: "throwExtEx"
                        }
                    ]
                }
            ],
            title: "Global exception handlers in ExtJS"
        },
        {
            xtype: "acecodeeditor",
            split: true,
            mode: "javascript",
            region: "south",
            height: 300
        }
    ]
});
