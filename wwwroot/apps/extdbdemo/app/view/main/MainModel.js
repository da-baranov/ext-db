/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtDbDemo.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        node: undefined
    },

    stores: {
        menu: {
            type: "tree",
            proxy: {
                type: 'ajax',
                url: Ext.getResourcePath('menu.json'),
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            },
            root: {
                expanded: true,
                text: "Examples"
            }
        }
    }
});
