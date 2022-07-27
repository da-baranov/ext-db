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

    onNodeChanged: function (node) {
        const e = ExtDb.Error.toError("Hello");
        this.redirectTo("example/" + node.get("id"));
    },

    onViewChange(index) {
        const viewModel = this.getViewModel();

        index = parseInt(index) || 0;

        // Change selected node
        const menuStore = this.getStore("menu");
        const menuItem = menuStore.findRecord("id", index);
        if (menuItem) {
            viewModel.set("node", menuItem);
        }


        // Switch active view
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
