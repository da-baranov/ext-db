Ext.define("ExtDbDemo.View.AceDemoView", {
    requires: [
        "ExtDb.component.AceCodeEditor"
    ],
    extend: "Ext.panel.Panel",
    title: "ACE code editor example (JSON mode)",
    alias: "widget.acedemoview",
    layout: "border",
    tbar: [
        {
            xtype: "combobox",
            fieldLabel: " Mode",
            displayField: "display",
            valueField: "code",
            value: "json",
            store: {
                data: [{ code: "json", display: "JSON" }, { code: "xml", display: "XML" }, { code: "html", display: "HTML" },]
            },
            listeners: {
                change: function (r, newValue) {
                    const editor = this.up("panel").down("acecodeeditor");
                    if (newValue) {
                        if (newValue === "json") {
                            editor.setMode(newValue);
                            editor.setValue('{ "lastName" : "John", "firstName": "Doe", "age": 64 }');
                        } 
                        if (newValue === "xml") {
                            editor.setMode(newValue);
                            editor.setValue('<patient xmlns="urn:tmp"><firstName>John</firstName><lastName>Doe</lastName></patient>');
                        }
                        if (newValue === "html") {
                            editor.setMode(newValue);
                            editor.setValue("<html><head><title>Page</title></head><body><h1>Hello</h1></body></html>");
                        }
                    }
                }
            }
        },
        '-',
        {
            text: "Beautify",
            handler: function () {
                this.up("panel").down("acecodeeditor").beautify();
            }
        }
    ],
    items: [
        {
            xtype: "acecodeeditor",
            region: "center",
            mode: "json",
            value: '{ "hello" : "world", "price": 100.9 }'
        },
        {
            xtype: "panel",
            split: true,
            bodyPadding: 10,
            height: 300,
            region: "south",
            html: "An example of the ACE Editor packaged as an ExtJS component. The component supports code editing, colorization, folding, formatting, beautifying and many more."
        }
    ]
});