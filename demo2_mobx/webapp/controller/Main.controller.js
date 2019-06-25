sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("MobXExampleProject.controller.Main", {
		onAddSoldBook: function(oEvt){
			var oItem = oEvt.getSource().getBindingContext().getObject();
			oItem.amountSold++;
		},
		
		onRemoveSoldBook: function(oEvt){
			var oItem = oEvt.getSource().getBindingContext().getObject();
			oItem.amountSold--;
		},
		
		onAddBookPress: function(oEvt){
			if (!this.oAddBookDialog) {
                this.oAddBookDialog = sap.ui.xmlfragment("MobXExampleProject.fragments.AddBookDialog", this);
                this.getView().addDependent(this.oAddBookDialog);
            }
            this.oAddBookDialog.open();
		},
		
		onAddBookToModel: function(oEvt){
			var oModelData = this.getView().getModel().getData();
			oModelData.books.push(oModelData.bookToAdd);
			oEvt.getSource().getParent().close();
		},
		
		onCloseDialog: function(oEvt){
			oEvt.getSource().getParent().close();
		}
	});
});