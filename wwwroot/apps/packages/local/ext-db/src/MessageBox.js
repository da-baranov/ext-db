Ext.define('ExtDb.MessageBox', {

    statics: {

        alert: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.show({
                    title: title,
                    message: message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function (btn) {
                        resolve(btn);
                    }
                });
            });
        },

        prompt: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.prompt(title, message, function (btn, text) {
                    if (btn === 'ok') {
                        resolve(text);
                    }
                });
            });
        },

        question: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.show({
                    title: title,
                    message: message,
                    buttons: Ext.Msg.YESNOCANCEL,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        resolve(btn);
                    }
                });
            });
        },

        confirm: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.show({
                    title: title,
                    message: message,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        resolve(btn);
                    }
                });
            });
        },

        error: function (title, message) {
            return new Promise(function (resolve, reject) {
                Ext.Msg.show({
                    title: title,
                    message: message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR,
                    fn: function (btn) {
                        resolve(btn);
                    }
                });
            });
        }
    }
});