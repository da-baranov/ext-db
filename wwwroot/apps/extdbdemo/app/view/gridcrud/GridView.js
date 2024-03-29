﻿Ext.define("ExtDbDemo.view.gridcrud.GridView", {
    requires: [ 
        "ExtDb.grid.Panel",
        "ExtDbDemo.view.gridcrud.GridViewController",
        "ExtDbDemo.view.gridcrud.GridViewModel"
    ],
    extend: "Ext.panel.Panel",
    title: "Complete CRUD (Grid + Modal Form) example",
    alias: "widget.extdbdemogridview",
    controller: "gridviewcontroller",
    viewModel: "gridviewmodel",

    layout: "border",
    defaultFocus: "dgr",
    
    items: [
        {
            xtype: "extdbgrid",
            region: "center",
            itemId: "dgr",
            reference: "dgr",
            tbar: [
                {
                    iconCls: 'fa fa-plus',
                    text: 'Insert',
                    tooltip: "INS",
                    handler: "createPatient"
                },
                {
                    iconCls: 'fa fa-edit',
                    text: 'Edit',
                    tooltip: "F2",
                    bind: {
                        disabled: "{!selection}"
                    },
                    handler: "editPatient"
                },
                {
                    iconCls: 'fa fa-trash',
                    text: 'Delete',
                    tooltip: "DEL",
                    bind: {
                        disabled: "{!selection}"
                    },
                    handler: "deletePatients"
                },
                {
                    iconCls: 'fas fa-sync',
                    text: "Refresh",
                    tooltip: "F5",
                    handler: "refreshPatients"
                },
                '-',
                {
                    xtype: "label",
                    bind: {
                        text: " {checked.length} record(s) checked"
                    }
                }
            ],

            bind: {
                store: "{patients}",
                selection: "{selection}",
                checked: "{checked}"
            },

            columns: [
                {
                    text: "First Name",
                    dataIndex: "firstName",
                    flex: 2
                },
                {
                    text: "Last Name",
                    dataIndex: "lastName",
                    flex: 2
                },
                {
                    xtype: "datecolumn",
                    format: "d.m.Y",
                    text: "Birth Date/Time",
                    dataIndex: "birthTime",
                    flex: 1
                },
                {
                    text: "Gender",
                    dataIndex: "gender",
                    flex: 1
                },
            ],

            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        },
        {
            region: 'south',
            height: 100,
            bodyPadding: 4,
            split: true,
            html: 'A full ExtJS Grid + Modal CRUD example. The modal form controller controls the lifecycle of the modal form, in particular, prevents loss of unsaved changes, and does not allow a user to save invalid data'
        }
    ]
});