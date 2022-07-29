Ext.define('ExtDbDemo.view.GridViewController', {
    requires: [
        "ExtDbDemo.view.ModalForm",
        "ExtDbDemo.model.Patient",
        "ExtDb.MessageBox"
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridviewcontroller',

    control: {
        "#dgr": {
            oninsert: async function (sender, record, element, rowindex) {
                await this.createPatient();
            },
            onedit: async function (sender, record, element, rowindex) {
                await this.editPatient();
            },
            ondelete: async function (sender, record, element, rowindex) {
                await this.deletePatients();
            },
            onrefresh: async function () {
                await this.refreshPatients();
            }
        }
    },

    createForm: function () {
        const me = this;
        const store = this.getStore("patients");

        const form = new ExtDbDemo.view.ModalForm();
        form.on("saved", function (sender, model) {
            store.add(model);
        });
        form.on("close", function () {
            me.lookup("dgr").focus();
        });
        return form;
    },

    createPatient: async function () {
        // Create new record
        const formRecord = new ExtDbDemo.model.Patient();

        // Show form
        const form = this.createForm();
        form.setTitle("New Patient");
        form.getController().createRecord(formRecord);
        form.show();
    },

    editPatient: async function () {
        // Check if a record is selected
        const selection = this.getViewModel().get("selection");
        if (!selection) return;

        // Create a copy of the selected grid record
        const formRecord = selection.clone();

        // Show modal form
        const form = this.createForm();
        form.setTitle("Edit Patient");
        form.getController().editRecord(formRecord);
        form.show();
    },

    deletePatients: async function () {
        const checked = this.getViewModel().get("checked");
        if (!checked) return;

        const store = this.getStore("patients");

        if (await ExtDb.MessageBox.confirm("Question", "Remove?") === "yes") {
            store.remove(checked);
        }
    },

    refreshPatients: function () {
        const store = this.getStore("patients");
        store.reload();
    }
});
