/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */

Ext.application({
    requires: [
        'ExtDb.*',
        'ExtDbDemo.*'
    ],

    extend: 'ExtDbDemo.Application',

    name: 'ExtDbDemo',

    // The name of the initial view to create.
    mainView: 'ExtDbDemo.view.main.Main'
});
