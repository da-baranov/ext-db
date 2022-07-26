Ext.application({
    requires: [
        'ExtDbDemo.*'
    ],

    extend: 'ExtDbDemo.Application',
    name: 'ExtDbDemo',
    mainView: 'ExtDbDemo.view.main.Main',
    launch: function () {
        const el = document.getElementById("loading-overlay");
        if (el) el.remove();
    }
});
