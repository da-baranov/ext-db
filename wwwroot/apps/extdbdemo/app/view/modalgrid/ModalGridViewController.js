Ext.define('ExtDbDemo.view.modalgrid.ModalGridViewController', {
    requires: [
        "ExtDbDemo.view.modalgrid.ModalGridDialog"
    ],
    extend: "Ext.app.ViewController",
    alias: 'controller.modalgridview',

    // Input field lookup button click event hadler
    selectPatient: function () {
        const me = this;

        // Create a modal dialog
        const dialog = Ext.create("ExtDbDemo.view.modalgrid.ModalGridDialog");

        // Subscribe to the OK button click event
        dialog.on("ok", function (patient) {

            // This updates caller's model and data-bound input field value
            me.getViewModel().set("patient", patient);

            // Closes the modal
            dialog.close();
        });

        dialog.show();
    }
});
