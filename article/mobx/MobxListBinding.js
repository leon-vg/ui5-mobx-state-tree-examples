/* global mobx */
sap.ui.define(["sap/ui/model/ChangeReason", "sap/ui/model/ListBinding"],
	function(ChangeReason, ListBinding) {
		"use strict";

		return ListBinding.extend("sap.ui.mobx.MobxListBinding", {
			constructor: function(model, path, context, sorters, filters, params) {
				ListBinding.apply(this, arguments);
				this._model = model;
				this._path = path;
				this._context = context;
				this._sorters = sorters;
				this._filters = filters;
				this._params = params;
				this._mobxDisposer = mobx.reaction(
					function() {
						var observableArr = model.getProperty(path, context);
						if (observableArr && typeof observableArr.slice === 'function') {
							return observableArr.slice();
						}
					},
					this._fireChange.bind(this, {
						reason: ChangeReason.Change
					})
				);
			},

			destroy: function() {
				this._mobxDisposer();
				return ListBinding.prototype.destroy(this, arguments);
			},

			_getObservableArray: function() {
				return this._model.getProperty(this._path, this._context) || [];
			},

			getLength: function() {
				return this._getObservableArray().length;
			},

			getContexts: function(startIndex, sizeLimit) {
				if (!startIndex) {
					startIndex = 0;
				}
				if (!sizeLimit) {
					sizeLimit = this._model.iSizeLimit;
				}
				var validContextCount = Math.min(this._getObservableArray().length - startIndex, sizeLimit);
				if (validContextCount < 1) {
					return [];
				}
				var exclusiveEndIndex = startIndex + validContextCount;
				var effectiveArrPath = this._model.resolve(this._path, this._context);
				if (!(effectiveArrPath.endsWith("/"))) {
					effectiveArrPath = effectiveArrPath + "/";
				}
				var contexts = [];
				for (var i = startIndex; i < exclusiveEndIndex; i++) {
					contexts.push(this._model.getContext(effectiveArrPath + i));
				}
				return contexts;
			}

		});

	});