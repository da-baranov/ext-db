Ext.define("ExtDbDemo.view.AjaxView", {
    requires: ["ExtDb.component.AceCodeEditor","ExtDb.Ajax"],
    extend: "Ext.panel.Panel",
    alias: "widget.ajaxview",
    layout: "border",
    items: [
        {
            title: "Asynchronous Ajax requests",
            region: "center",
            layout: "center",
            items: [
                {
                    xtype: "button",
                    text: "Load currency exchange rates",
                    handler: async function () {
                        
                        const out = this.up("ajaxview").down("#txtJson");
                        try {
                            out.mask("Loading...");
                            const data = await ExtDb.Ajax.get("https://api.exchangerate.host/latest");
                            out.setValue(JSON.stringify(data));
                            out.beautify();
                        }
                        finally {
                            out.unmask();
                        }
                    }
                }
            ]
        },
        {
            xtype: "acecodeeditor",
            height: 200,
            region: "south",
            itemId: "txtJson",
            split: true
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
                    url: "apps/extdbdemo/app/view/AjaxView.js"
                }
            ]
        }
    ]
});