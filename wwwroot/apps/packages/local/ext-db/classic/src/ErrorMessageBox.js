Ext.define("ExtDb.ErrorMessageBox", {
    extend: "Ext.window.Window",
    modal: true,
    title: "Error",
    width: 400,
    height: 160,
    
    layout: "border",
    bodyPadding: 10,

    config: {
        message: undefined,
        stack: undefined
    },

    initComponent: function () {
        this.callParent(arguments);
        this.down("#lblMessage").setText(this.getMessage());
        this.down("#txtStack").setValue(this.getStack());
    },

    items: [
        {
            xtype: "container",
            region: "west",
            width: 60,
            layout: {
                type: "vbox",
                pack: "start",
                align: "start"
            },
            border: 0,
            items: [
                {
                    xtype: "component",
                    cls: "x-message-box-icon x-message-box-error"
                }
            ]
        },
        {
            xtype: "container",
            region: "center",
            layout: "border",
            items: [
                {
                    xtype: "container",
                    region: "north",
                    height: 80,
                    layout: "fit",
                    items: [
                        {
                            xtype: "label",
                            itemId: "lblMessage"
                        }
                    ]
                },
                {
                    xtype: "container",
                    region: "center",
                    layout: "fit",
                    items: [
                        {
                            xtype: "textarea",
                            itemId: "txtStack",
                            inputAttrTpl: 'wrap="off"',
                            scrollable: true,
                            style: "white-space:nowrap; overflow: scroll;"
                        }
                    ]
                },
                
            ]
        }
    ],

    fbar: [
        {
            xtype: "button",
            text: "Details",
            handler: function () {
                this.up("window").setHeight(300);
            }
        },
        {
            text: "OK",
            handler: function () {
                this.up("window").fireEvent("ok");
                this.up("window").close();
            }
        }
    ]
});