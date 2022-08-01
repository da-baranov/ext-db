Ext.define('ExtDbDemo.view.modalgrid.ModalGridDialogModel', {
    requires: [
        "ExtDbDemo.store.Patient"
    ],

    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modalgriddialog',
    data: {
        // Selected patient
        patient: undefined
    },

    stores: {
        // List of patients
        patients: {
            type: "patient",
            listeners: {
                load: "onPatientsLoaded"
            }
        }
    }
});
