/* global mobx */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"MobXExampleProject/mockData/mockData"
], function(UIComponent, JSONModel, mockData) {
	"use strict";
	return UIComponent.extend("MobXExampleProject.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			var oModel = new JSONModel(mockData);
			this.setModel(oModel);

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		},
	});
});