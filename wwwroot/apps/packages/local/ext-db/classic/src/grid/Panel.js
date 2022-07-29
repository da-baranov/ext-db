Ext.define("ExtDb.grid.Panel", {
    extend: "Ext.grid.Panel",
    alias: [
        "widget.extdbgrid",
        "widget.extdbgridpanel"
    ],

    config: {
        checked: []
    },

    publishes: [
        "checked"
    ],

    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },

    initComponent: function () {
        this.callParent(arguments);
        this._extend();
    },

    _extend: function () {
        const me = this;
        me.handleKeys();
    },

    handleKeys: function () {
        const grid = this;

        grid.on("selectionchange", function (sender, selected) {
            this.setChecked(selected || []);
        });

        grid.on("rowdblclick", function (sender, record, element, rowIndex) {
            grid.fireEvent("onedit", sender, record, element, rowIndex);
        });

        grid.on("containerkeydown", function (sender, e) {
            const me = this;

            if (e.getKey() === Ext.event.Event.INSERT) {
                return grid.fireEvent("oninsert", sender);
            }
        });

        grid.on("rowkeydown", function (sender, record, element, rowIndex, e) {

            if (e.getKey() === Ext.event.Event.INSERT) {
                return grid.fireEvent("oninsert", sender);
            }

            if (e.getKey() === Ext.event.Event.DELETE) {
                if (record) {
                    return grid.fireEvent("ondelete", record, element, rowIndex, e);
                }
            }

            if (e.getKey() === Ext.event.Event.F2) {
                if (record) {
                    return grid.fireEvent("onedit", record, element, rowIndex, e);
                }
            }

            if (e.getKey() === Ext.event.Event.F5) {
                e.preventDefault(); // prevents browser refresh

                var result = grid.fireEvent("onrefresh", sender);
                if (!result) return false;

                const store = me.getStore();
                if (store) store.reload();
            }
        });
    }
});