Ext.define('ExtDbDemo.view.modalgrid.ModalGridDialogController', {
    requires: [
        "ExtDb.Error"
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.modalgriddialog',

    control: {
        "grid": {

            // Select a record on mouse double click and close modal
            rowdblclick: function (sender, record) {
                if (record) {
                    this.onPatientSelected(record);
                }
            },

            // Select a record on ENTER key press and close modal
            rowkeydown: function (sender, record, element, rowIndex, e) {
                if (record && e.getKey() == Ext.event.Event.ENTER) {
                    this.onPatientSelected(record);
                }
            }
        }
    },

    onPatientsLoaded: function (sender, records, successful, operation) {
        const me = this;
        if (!successful) {
            ExtDb.Error.errorMessageBox(operation);
        } else {
            if (records && records.length) {
                // Sets first row selected (see grid.bind.selection property)
                // AND also makes grid focused (see grid.bind.focused property)
                // so the grid will respond to navigation keys
                me.getViewModel().set("patient", records[0]);
            }
        }
    },

    onPatientSelected: function (patient) {
        const view = this.getView();
        view.fireEvent("ok", patient);
    }
});
