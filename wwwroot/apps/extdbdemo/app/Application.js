Ext.define('ExtDbDemo.Application', {
    requires: ["ExtDb.FontAwesome"],
    extend: 'Ext.app.Application',

    name: 'ExtDbDemo',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function () {
        ExtDb.FontAwesome.enable();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
