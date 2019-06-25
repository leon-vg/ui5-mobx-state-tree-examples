// global mobxStateTree
sap.ui.define([
  ], function() {
      "use strict";
      
      const types = mobxStateTree.types;
  
      const HistoryStore = types.model("HistoryStore", {
          states: types.array(types.frozen())
      })
      .views(self => ({
        get length() {
          return self.states.length
        }
      }))
      .actions(self => ({
        addHistoryState(state) {
            self.states.push(state)
        }
      }));
  
      // Creëer de BoekStore
      const historyStore = HistoryStore.create({states: []});
  
      return historyStore;
  
  });