Ext.define('ExtDbDemo.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'ExtDbDemo.view.main.MainController',
        'ExtDbDemo.view.main.MainModel',
        'ExtDbDemo.view.asyncmessageboxes.AsyncMessageBoxesView',
        'ExtDbDemo.view.gridcrud.GridView',
        'ExtDbDemo.view.ace.AceDemoView',
        'ExtDbDemo.view.fontawesome.FontAwesomeView',
        'ExtDbDemo.view.asyncajax.AjaxView',
        'ExtDbDemo.view.globalerr.ErrorDemoView',
        'ExtDbDemo.view.globalex.GlobalExView',
        'ExtDbDemo.view.modalgrid.ModalGridView'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: "border"
    },

    items: [
        {
            xtype: "container",
            html: "<div><strong>EXTDB</strong> - Sencha ExtJS tips | recipes | examples </div></div>",
            height: 30,
            padding: "7 0 0 20",
            region: "north"
        },
        {
            xtype: "treepanel",
            title: "ExtDb examples",
            itemId: "treeMenu",
            reference: "treeMenu",
            region: "west",
            split: true,
            width: "30%",
            bind: {
                selection: "{node}",
                store: "{menu}"
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
                },
                {
                    xtype: "errordemoview"
                },
                {
                    xtype: "globalexview"
                },
                {
                    xtype: "modalgridview"
                }
            ]
        }
    ]
});
