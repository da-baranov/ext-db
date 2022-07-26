Ext.define("ExtDb.mixin.Grid", {
    extend: "Ext.Mixin",

    mixinConfig: {
        after: {
            initComponent: '_extend'
        }
    },

    _extend: function () {
        const me = this;
        me.setFirstRowAlwaysSelected();
        me.handleKeys();
    },

    handleKeys: function () {
        const grid = this;
        grid.on("rowkeydown", function (sender, record, element, rowIndex, e) {

            if (e.getKey() === Ext.event.Event.INSERT) {
                return grid.fireEvent("oninsert", sender, record, element, rowIndex);
            }

            if (e.getKey() === Ext.event.Event.DELETE) {
                if (record) {
                    return grid.fireEvent("ondelete", sender, record, element, rowIndex);
                }
            }

            if (e.getKey() === Ext.event.Event.ENTER) {
                if (record) {
                    return grid.fireEvent("onedit", sender, record, element, rowIndex);
                }
            }

            if (e.getKey() === Ext.event.Event.F5) {
                e.preventDefault(); // prevents browser refresh

                var result = grid.fireEvent("onrefresh", sender, record, element, rowIndex);
                if (!result) return false;

                if (me.getStore()) {
                    me.getStore().reload();
                }
            }
        });
    },

    setFirstRowAlwaysSelected: function () {
        const grid = this;
        const store = grid.getStore();
        const selectionModel = this.getSelectionModel();
        if (store && selectionModel) {
            store.on("load", function (sender, records) {
                if (records && records.length) {
                    selectionModel.select([records[0]]);
                }
            });
        }
    }
});