/* global mobx */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"MobXExampleProject/mobx/MobxModel",
	"MobXExampleProject/mockData/mockData",
	"sap/m/MessageToast"
], function(UIComponent, MobxModel, mockData, MessageToast) {
	"use strict";
	return UIComponent.extend("MobXExampleProject.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			var oModel = new MobxModel(new mobx.observable(mockData));
			this.setModel(oModel);
			this.setMobxFunctions();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		},

		setMobxFunctions: function() {
			var oObservable = this.getModel().getData();
			//Triggered once immediatly, then afterwards everytime one of its dependencies change
			mobx.autorun(() => {
				if(oObservable.Boeken.length){
					MessageToast.show("Er is een boek toegevoegd of verwijderd");
				}
			});

			//Triggers when the function returns true, then removes itself
			mobx.when(
				() => oObservable.TotaalAantalVerkochteBoeken > 500,
				() => {
					MessageToast.show("Er zijn " + oObservable.TotaalAantalVerkochteBoeken + " boeken verkocht!!!");
				}
			);
		
			//Triggered only when the observed property changes
			mobx.reaction(
				() => oObservable.BestSellers.length,
				() => {
					if(oObservable.BestSellers.length > 0){
						MessageToast.show("Er zijn " + oObservable.BestSellers.length + " BestSeller(s) op de lijst.");
					}
				}
			);
		}
	});
});