Ext.define("ExtDb.component.AceCodeEditor", {
    requires: [
        "ExtDb.AsyncLoader"
    ],
    extend: "Ext.container.Container",
    alias: "widget.acecodeeditor",
    border: false,

    config: {
        value: null,
        mode: "json"
    },

    publishes: [
        "value"
    ],

    _editor: null,
    _beautify: null,

    updateValue: function (value) {
        if (!value) value = "";
        if (this._editor) {
            let editorValue = this._editor.getValue();
            if (!editorValue) editorValue = "";
            if (value !== editorValue) {
                this._editor.setValue(value);
                this._editor.clearSelection();
                // this._editor.moveCursorToPosition({ row: 0, column: 0 });
            }
        }
    },

    ace_id: null,

    initComponent: function () {
        this.callParent(arguments);
        this.ace_id = "ace_" + Ext.data.identifier.Uuid.createRandom()(); // not a typo
        this.setHtml(
            `<div id="${this.ace_id}" style="position:absolute;top:0;right:0;bottom:0;left:0;border:0"></div>`
        );
    },

    listeners: {
        render: function () {
            this.initAce();
        },
        resize: function () {
            if (this._editor) this._editor.resize(true);
        }
    },

    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    initAce: function () {
        const me = this;
        const mode = me.getMode() || "json";
        me._editor = window.ace.edit(me.ace_id);
        me._beautify = window.ace.require("ace/ext/beautify");
        me._editor.setTheme("ace/theme/chrome");
        me._editor.session.setMode("ace/mode/" + mode);
        if (me.initialConfig && me.initialConfig.value) {
            me.updateValue(me.initialConfig.value);
        }
        me._editor.on("change", function (e) {
            var editorValue = me._editor.getValue();
            if (!editorValue) editorValue = "";
            var thisValue = me.getValue();
            if (!thisValue) thisValue = "";
            if (editorValue !== thisValue) {
                me.setValue(editorValue);
                me.fireEvent("change", me, editorValue);
            }
        });

        return;

        // Executing workers
        ExtDb.AsyncLoader
            .loadAll(scripts)
            .then(function () {
            })
            .catch(function (e) {
                alert(e);
            });
    },

    beautify: function () {
        this._beautify.beautify(this._editor.session);
    },

    insert: function (text) {
        this._editor.insert(text);
    }
});
