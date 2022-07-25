Ext.define("ExtDbDemo.view.GridView", {
    requires: [
        "ExtDb.mixin.Grid"
    ],
    extend: "Ext.grid.Panel",
    title: "Grid",

    alias: "widget.extdbdemogridview",

    mixins: {
        "grid": "ExtDb.mixin.Grid"
    },

    tbar: [
        {
            text: 'Insert (INS)'  
        },
        {
            text: 'Edit (ENTER)'
        },
        {
            text: 'Delete (DEL)'
        },
        {
            text: "Refresh (F5)",
            handler: function () {
                this.up("extdbdemogridview").getStore().reload();
            }
        }
    ],

    store: {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'json/people.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    },

    columns: [
        {
            text: "First Name",
            dataIndex: "firstName",
            flex: 1
        },
        {
            text: "Last Name",
            dataIndex: "lastName",
            flex: 1
        }
    ],

    listeners: {
        oninsert: function (sender, record, element, rowindex) {
            alert("insert");
        },
        onedit: function (sender, record, element, rowindex) {
            alert("edit");
        },
        ondelete: function (sender, record, element, rowindex) {
            alert("delete");
        },
        onrefresh: function () {
            alert("refresh");
        }
    }
});