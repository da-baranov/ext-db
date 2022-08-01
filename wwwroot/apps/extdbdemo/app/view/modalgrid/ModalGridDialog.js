Ext.define('ExtDbDemo.view.modalgrid.ModalGridDialog',{
    extend: 'Ext.window.Window',
    modal: true,
    height: 400,
    width: 400,
    title: "Select Patient",
    requires: [
        'ExtDbDemo.view.modalgrid.ModalGridDialogController',
        'ExtDbDemo.view.modalgrid.ModalGridDialogModel'
    ],

    controller: 'modalgriddialog',
    viewModel: {
        type: 'modalgriddialog'
    },
    alias: "widget.modalgriddialog",

    layout: "border",

    items: [
        {
            xtype: "grid",
            region: "center",
            reference: "grid",
            bind: {
                // Grid data source
                store: "{patients}",

                // Holds selected row
                selection: "{patient}",

                // Forces datagrid to receive focus on form open. This allows a user to use keyboard arrow keys 
                focused: "{patient}"
            },
            columns: [
                {
                    text: "FirstName",
                    dataIndex: "firstName",
                    flex: 1
                },
                {
                    text: "Last name",
                    dataIndex: "lastName",
                    flex: 1
                },
                {
                    text: "Birth date/time",
                    xtype: "datecolumn",
                    format: "d.m.Y",
                    dataIndex: "birthTime",
                    flex: 1
                }
            ]
        },
        {
            xtype: "container",
            region: "south",
            padding: 10,
            html: "A simple modal dialog with a data grid that allows a user to select some value from a dictionary.<br /><br />" +
                "Important improvements: <ol><li>Data grid gets focus automatically after form is opened </li>" + 
                "<li>The form closes when the Enter key is pressed</li>" + 
                "<li>The form closes on mouse double click</li></ol>"
        }
    ],

    fbar: [
        {
            text: "OK",
            handler: function () {
                // Get selected patient
                const patient = this.up("window").getViewModel().get("patient");

                // Fires ok event but does not close the window
                this.up("window").getController().onPatientSelected(patient);
            },
            bind: {
                disabled: "{!patient}"
            }
        },
        {
            text: "Cancel",
            handler: function () {
                // Closes the modal silently
                this.up("window").close();
            }
        }
    ]
});
