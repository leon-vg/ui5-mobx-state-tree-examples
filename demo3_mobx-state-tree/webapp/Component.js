/* global mobx */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"MobXExampleProject/mobx/MobxModel",
	"sap/m/MessageToast",
	"MobXExampleProject/store/bookStore"
], function(UIComponent, MobxModel, MessageToast, bookStore) {
	"use strict";
	return UIComponent.extend("MobXExampleProject.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			this.setModel(new MobxModel(bookStore));
			this.setMobxFunctions();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		},

		setMobxFunctions: function() {
			var oObservable = this.getModel().getData();
			//Triggered once immediatly, then afterwards everytime one of its dependencies change
			mobx.autorun(() => {
				if(oObservable.books.length){
					MessageToast.show("A book has been added or deleted");
				}
			});

			//Triggers when the function returns true, then removes itself
			mobx.when(
				() => oObservable.totalNumberSoldBooks > 500,
				() => {
					MessageToast.show("A total of " + oObservable.totalNumberSoldBooks + " books have been sold!!!");
				}
			);
		
			//Triggered only when the observed property changes
			mobx.reaction(
				() => oObservable.bestsellers.length,
				() => {
					if(oObservable.bestsellers.length > 0){
						MessageToast.show("There are " + oObservable.bestsellers.length + " bestseller(s) in this list.");
					}
				}
			);
		}
	});
});