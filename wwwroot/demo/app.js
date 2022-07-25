/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MyDemo.Application',

    name: 'MyDemo',

    requires: [
        // This will automatically load all classes in the MyDemo namespace
        // so that application classes do not need to require each other.
        'MyDemo.*'
    ],

    // The name of the initial view to create.
    mainView: 'MyDemo.view.main.Main'
});
