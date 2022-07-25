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
                root: {
                    expanded: true,
                    text: "Examples",
                    children: [
                        { text: 'Async message boxes', leaf: true, id: 0 },
                        { text: 'Grid mixin', leaf: true, id: 1 },
                        { text: 'ACE code editor', leaf: true, id: 2 },
                        { text: 'Font Awesome CDN example', leaf: true, id: 3 }
                    ]
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
                }
            ]
        }
    ]
});
