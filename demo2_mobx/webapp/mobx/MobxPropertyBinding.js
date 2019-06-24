/* global mobx */
sap.ui.define(["sap/ui/model/ChangeReason", "sap/ui/model/PropertyBinding"],
	function(ChangeReason, PropertyBinding) {
		"use strict";

		return PropertyBinding.extend("sap.ui.mobx.MobxPropertyBinding", {
			constructor: function(mobxModel, path, context, params) {
				PropertyBinding.apply(this, arguments);
				this._model = mobxModel;
				this._path = path;
				this._context = context;
				this._params = params;
				this._mobxDisposer = mobx.reaction(
					this._model.getProperty.bind(this._model, path, context),
					this._fireChange.bind(this, {
						reason: ChangeReason.Change
					})
				);
			},
			destroy: function() {
				this._mobxDisposer();
				PropertyBinding.prototype.destroy.apply(this, arguments);
			},
			getValue: function() {
				return this._model.getProperty(this._path, this._context);
			},
			setValue: function(value) {
				if (!this.bSuspended) {
					this._model.setProperty(this._path, value, this._context);
				}
			}
		});

	});