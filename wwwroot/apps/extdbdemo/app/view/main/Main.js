Ext.define('ExtDbDemo.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'ExtDbDemo.view.main.MainController',
        'ExtDbDemo.view.main.MainModel',
        'ExtDbDemo.view.AsyncMessageBoxesView',
        'ExtDbDemo.view.GridView',
        'ExtDbDemo.View.AceDemoView',
        'ExtDbDemo.view.FontAwesomeView',
        'ExtDbDemo.view.AjaxView'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: "border"
    },

    items: [
        {
            xtype: "treepanel",
            title: "ExtDb examples",
            itemId: "treeMenu",
            region: "west",
            split: true,
            width: "30%",
            store: {
                type: "tree",
                proxy: {
                    type: 'ajax',
                    url: Ext.getResourcePath('menu.json'),
                    reader: {
                        type: 'json',
                        rootProperty: 'children'
                    }
                },
                root: {
                    expanded: true,
                    text: "Examples"
                }
            },
            bind: {
                selection: "{node}"
            }
        },
        {
            xtype: "container",
            reference: "cntr",
            layout: {
                type: "card"
            },
            region: "center",
            items: [
                {
                    xtype: "asyncmessageboxesview"
                },
                {
                    xtype: "extdbdemogridview"
                },
                {
                    xtype: "acedemoview"
                },
                {
                    xtype: "fontawesomeview"
                },
                {
                    xtype: "ajaxview"
                }
            ]
        }
    ]
});
