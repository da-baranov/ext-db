Ext.define("ExtDb.grid.Panel", {
    extend: "Ext.grid.Panel",
    alias: [
        "widget.extdbgrid",
        "widget.extdbgridpanel"
    ],

    mixins: [
        "ExtDb.mixin.Grid"
    ]
});