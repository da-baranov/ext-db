Ext.define('ExtDbDemo.view.main.MainController', {
    requires: [
        'ExtDb.Error'
    ],
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    routes: {
        'example/:index': {
            action: 'onViewChange'
        }
    },

    bindings: {
        onNodeChanged: "{node}"
    },

    //listen: {
    //    "#treeMenu": {
    //        render: function () {
    //            const tree = this.lookup("tree");
    //            const store = tree.getStore();
    //            const root = store.getRoot();
    //            root.removeAll();
    //        }
    //    }
    //},

    onNodeChanged: function (node) {
        const e = ExtDb.Error.toError("Hello");
        this.redirectTo("example/" + node.get("id"));
    },

    onViewChange(index) {
        index = parseInt(index) || 0;
        const view = this.lookup("cntr");
        let item = undefined;
        try {
            item = view.items.get(index);
        }
        catch (e) {
            item = undefined;
        }

        if (item) {
            view.setActiveItem(item);
        } else {
            view.setActiveItem(0);
        }
    }
});
