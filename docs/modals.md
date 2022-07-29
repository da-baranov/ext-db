# Sencha ExtJS Grid + Modal + CRUD example

Editing a table entry in a separate modal form is a common feature in desktop applications developed in languages like C# or Delphi.
But in web applications modal forms are not so popular due to JavaScript asynchronous nature.
In this example I want to show some tricks that allow you to implement modal forms UX in your ExtJS application.

See [Demo](https://da-baranov.github.io/ext-db/wwwroot/index.html#example/1)

## Data grid

It is based on the standard ExtJS grid Panel, with the following improvements:

* A toolbar added 
* Standard hotkeys assigned (INS to add a record, F2 to edit the record, DEL to delete selected records)
* Double-clicking on an active row opens a modal editor
* Multiple rows can be selected with checkboxes, which allows a user to perform some batch operations with selected rows
* A paging toolbar added (not actually used in this demo)
* Grid receives focus back after the modal editor form close

## Modal editor

The modal editor form is implemented using the MVVM pattern and has a controller and a viewModel.
The controller is inherited from the ExtDb.app.ModalViewController class and controls the modal form lifecycle:

* Initiates the loading of form data from a local or remote data source
* Sets the form's active record. For this purposes an instance of Ext.data.Model is used.
* Does not allow the form to be closed if the form contains invalid data
* Does not allow the form to be closed if the form contains modified and unsaved changes









