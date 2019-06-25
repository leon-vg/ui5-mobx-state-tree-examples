sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"MobXExampleProject/model/boekStore",
	"sap/m/MessageToast"
], function(Controller, JSONModel, boekStore, MessageToast) {
	"use strict";
	return Controller.extend("MobXExampleProject.controller.Main", {
		onAddSoldBook: function(oEvt){
			var oBook = oEvt.getSource().getBindingContext().getObject();
			// oBook.AantalVerkocht++;
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
			this.oAddBookDialog.setModel(new JSONModel({DatumUitgifte: new Date()}));
            this.oAddBookDialog.open();
		},
		
		onAddBookToModel: function(oEvt){
			var oModelData = this.oAddBookDialog.getModel().getData();
			boekStore.addBook(oModelData);
			oEvt.getSource().getParent().close();
		},
		
		onCloseDialog: function(oEvt){
			oEvt.getSource().getParent().close();
		},

		onSave: function() {
			boekStore.saveState();
			MessageToast.show("State is opgeslagen");
		},

		onRecover: function() {
			boekStore.recoverState();
			MessageToast.show("State is hersteld");
		},

		onHistoryChange: function(oEvent) {
			boekStore.setCurrentStep(oEvent.getParameter("value"));
		}
	});
});