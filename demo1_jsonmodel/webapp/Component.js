/* global mobx */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"MobXExampleProject/model/models",
	"MobXExampleProject/mobx/MobxModel",
	"sap/ui/model/json/JSONModel",
	"MobXExampleProject/mockData/mockData",
	"sap/m/MessageToast"
], function(UIComponent, Device, models, MobxModel, JSONModel, mockData, MessageToast) {
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