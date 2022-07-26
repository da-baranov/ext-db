Ext.define("My.Panel", {
    requires: ["ExtDb.Ajax"],
    extend: "Ext.panel.Panel",
    items: [
        {
            xtype: "button",
            text: "GET",
            handler: async function () {
                const data = await ExtDb.Ajax.get("https://api.exchangerate.host/latest");
                alert(JSON.stringify(data));
            }
        }
    ]
});