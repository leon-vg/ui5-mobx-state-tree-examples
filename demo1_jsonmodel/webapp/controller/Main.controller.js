sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";
	return Controller.extend("MobXExampleProject.controller.Main", {
		
		onAfterRendering: function(){
			this.calculateTotals();
		},
		
		onAddSoldBook: function(oEvt){
			var oItem = oEvt.getSource().getBindingContext().getObject();
			oItem.AantalVerkocht++;
			this.getView().getModel().refresh();
			this.calculateTotals();
			this.showBoekWijziging();
		},
		
		onRemoveSoldBook: function(oEvt){
			var oItem = oEvt.getSource().getBindingContext().getObject();
			oItem.AantalVerkocht--;
			this.getView().getModel().refresh();
			this.calculateTotals();
			this.showBoekWijziging();
		},

		showBoekWijziging: function(){
			MessageToast.show("Er is een boek toegevoegd of verwijderd");
		},

		showBoekenVerkochtRecord: function(){
			MessageToast.show("Er zijn meer dan 500 boeken verkocht!!!");
		},
		
		calculateTotals: function(){
			var oModel = this.getView().getModel();
			var aBoeken = oModel.getData().Boeken;

			//Bereken totaal aantal verkochte boeken
			var iTotaalVerkocht = 0;
			aBoeken.map((oBook) => { iTotaalVerkocht = iTotaalVerkocht + oBook.AantalVerkocht;});

			//Bepaal de bestseller array
			var aBestSellerArray = aBoeken.filter((oBook) => { return oBook.AantalVerkocht >= 15;});;
			
			//Set beide properties weer in het model
			oModel.setProperty("/TotaalAantalVerkochteBoeken", iTotaalVerkocht);
			oModel.setProperty("/BestSellers", aBestSellerArray);
			
			//Als er meer dan 500 boeken verkocht zijn, toon dit dan!
			if(parseInt(iTotaalVerkocht) > 500){
				this.showBoekenVerkochtRecord();
			}

			if(aBestSellerArray.length > 0){
				MessageToast.show("Er zijn " + aBestSellerArray.length + " BestSeller(s) op de lijst.");
			}
		},

		onAddBookPress: function(oEvt){
			if (!this.oAddBookDialog) {
                this.oAddBookDialog = sap.ui.xmlfragment("MobXExampleProject.fragments.AddBookDialog", this);
                this.getView().addDependent(this.oAddBookDialog);
            }
            this.oAddBookDialog.open();
		},
		
		onAddBookToModel: function(oEvt){
			var oModel = this.getView().getModel();
			var oBookToAdd = oModel.getData().BookToAdd;
			var aBooks = oModel.getData().Boeken
			aBooks.push(oBookToAdd);
			oModel.setProperty("/Boeken", aBooks);
			this.calculateTotals();
			oEvt.getSource().getParent().close();
		},
		
		onCloseDialog: function(oEvt){
			oEvt.getSource().getParent().close();
		}
	});
});