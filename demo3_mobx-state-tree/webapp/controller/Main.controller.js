sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"MobXExampleProject/store/bookStore",
	"sap/m/MessageToast"
], function(Controller, JSONModel, bookStore, MessageToast) {
	"use strict";
	return Controller.extend("MobXExampleProject.controller.Main", {
		onAddSoldBook: function(oEvt){
			var oBook = oEvt.getSource().getBindingContext().getObject();
			// oBook.amountSold++;
			oBook.addSoldBook();
		},
		
		onRemoveSoldBook: function(oEvt){
			var oBook = oEvt.getSource().getBindingContext().getObject();
			oBook.removeSoldBook();
		},
		
		onAddBookPress: function(){
			if (!this.oAddBookDialog) {
                this.oAddBookDialog = sap.ui.xmlfragment("MobXExampleProject.fragments.AddBookDialog", this);
            }
			this.oAddBookDialog.setModel(new JSONModel({dateReleased: new Date()}));
            this.oAddBookDialog.open();
		},
		
		onAddBookToModel: function(oEvt){
			var oModelData = this.oAddBookDialog.getModel().getData();
			bookStore.addBook(oModelData);
			oEvt.getSource().getParent().close();
		},
		
		onCloseDialog: function(oEvt){
			oEvt.getSource().getParent().close();
		},

		onSave: function() {
			bookStore.saveState();
			MessageToast.show("State is saved");
		},

		onRecover: function() {
			bookStore.recoverState();
			MessageToast.show("State is recovered");
		}
	});
});