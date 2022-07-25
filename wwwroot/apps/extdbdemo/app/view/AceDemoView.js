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
            value: "{ 'hello' : 'world' }"
        }
    ]
});