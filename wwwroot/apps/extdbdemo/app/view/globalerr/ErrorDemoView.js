Ext.define('ExtDbDemo.view.globalerr.ErrorDemoView',{
    extend: 'Ext.panel.Panel',

    requires: [
        'ExtDbDemo.view.globalerr.ErrorDemoViewController',
        'ExtDbDemo.view.globalerr.ErrorDemoViewModel'
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
        }
    ]
});
