/* global mobx */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"MobXExampleProject/mobx/MobxModel",
	"sap/m/MessageToast",
	"MobXExampleProject/model/boekStore"
], function(UIComponent, MobxModel, MessageToast, boekStore) {
	"use strict";
	return UIComponent.extend("MobXExampleProject.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			this.setModel(new MobxModel(boekStore));
			this.setMobxFunctions();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		},

		setMobxFunctions: function() {
			//Triggered once immediatly, then afterwards everytime one of its dependencies change
			mobx.autorun(() => {
				if(boekStore.Boeken.length){
					MessageToast.show("Er is een boek toegevoegd of verwijderd");
				}
			});

			//Triggers when the function returns true, then removes itself
			mobx.when(
				() => boekStore.TotaalAantalVerkochteBoeken > 500,
				() => {
					MessageToast.show("Er zijn " + boekStore.TotaalAantalVerkochteBoeken + " boeken verkocht!!!");
				}
			);
		
			//Triggered only when the observed property changes
			mobx.reaction(
				() => boekStore.BestSellers.length,
				() => {
					if(boekStore.BestSellers.length > 0){
						MessageToast.show("Er zijn " + boekStore.BestSellers.length + " BestSeller(s) op de lijst.");
					}
				}
			);
		}
	});
});