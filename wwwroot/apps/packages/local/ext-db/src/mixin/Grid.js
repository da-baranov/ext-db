Ext.define("ExtDb.mixin.Grid", {
    extend: "Ext.Mixin",

    mixinConfig: {
        after: {
            initComponent: 'init'
        }
    },

    handleKeys: function () {
        const me = this;

        this.on("rowkeydown", function (sender, record, element, rowIndex, e) {

            if (e.getKey() === Ext.event.Event.INSERT) {
                return this.fireEvent("oninsert", sender, record, element, rowIndex);
            }

            if (e.getKey() === Ext.event.Event.DELETE) {
                if (record) {
                    return this.fireEvent("ondelete", sender, record, element, rowIndex);
                }
            }

            if (e.getKey() === Ext.event.Event.ENTER) {
                if (record) {
                    return this.fireEvent("onedit", sender, record, element, rowIndex);
                }
            }

            if (e.getKey() === Ext.event.Event.F5) {
                e.preventDefault(); // prevents browser refresh

                var result = this.fireEvent("onrefresh", sender, record, element, rowIndex);
                if (!result) return false;

                if (me.getStore()) {
                    me.getStore().reload();
                }
            }
        });
    },

    setFirstRowAlwaysSelected: function () {
        const store = this.getStore();
        const selectionModel = this.getSelectionModel();
        if (store && selectionModel) {
            store.on("load", function (sender, records) {
                if (records && records.length) {
                    selectionModel.select([records[0]]);
                }
            });
        }
    },

    init: function () {
        this.setFirstRowAlwaysSelected();
        this.handleKeys();
    }
});