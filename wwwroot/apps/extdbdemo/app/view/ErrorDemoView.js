Ext.define('ExtDbDemo.view.ErrorDemoView',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ExtDbDemo.view.ErrorDemoViewController',
        'ExtDbDemo.view.ErrorDemoViewModel'
    ],

    alias: 'widget.errordemoview',

    controller: 'errordemoview',
    viewModel: {
        type: 'errordemoview'
    },

    layout: "border",

    items: [
        // Top
        {
            xtype: "panel",
            title: "Generic exception handling in ExtJS",
            region: "center",
            layout: "center",
            items: [
                {
                    xtype: "container",
                    items: [
                        {
                            xtype: "button",
                            text: "Throw string",
                            handler: "throwString"
                        },
                        {
                            xtype: "button",
                            text: "Throw number",
                            handler: "throwNumber"
                        },
                        {
                            xtype: "button",
                            text: "Throw Error",
                            handler: "throwError"
                        },
                        {
                            xtype: "button",
                            text: "Throw Ext.Error",
                            handler: "throwExtError"
                        },
                        {
                            xtype: "button",
                            text: "Catch Store error",
                            handler: "catchStoreError"
                        }
                    ]
                }
            ]
        },

        // Bottom
        {
            xtype: "tabpanel",
            height: 300,
            split: true,
            region: "south",
            items: [
                {
                    xtype: "panel",
                    title: "Error.js",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/packages/local/ext-db/src/Error.js"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    title: "ErrorMessageBox.js",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/packages/local/ext-db/classic/src/ErrorMessageBox.js"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    title: "This view controller",
                    layout: "fit",
                    items: [
                        {
                            xtype: "acecodeeditor",
                            mode: "javascript",
                            url: "apps/extdbdemo/app/view/ErrorDemoViewController.js"
                        }
                    ]
                }
            ]
        }
    ]
});
