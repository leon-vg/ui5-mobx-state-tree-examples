// global mobxStateTree
sap.ui.define([
  "./Boek", 
  "../store/historyStore",
  "MobXExampleProject/mockData/mockData"
], function(Boek, historyStore, mockData) {
    "use strict";
    
    const types = mobxStateTree.types;

    // Definitie van een BoekStore
    const BoekStore = types.model("BoekStore", {
        Boeken: types.array(Boek)
    })
    .views(self => ({
      get BestSellers(){
        return self.Boeken.filter((oBook) => { return oBook.AantalVerkocht >= 15;});
      },
      get TotaalAantalVerkochteBoeken() {
        var iTotal = 0;
        self.Boeken.forEach((oBook) => { iTotal = iTotal + oBook.AantalVerkocht;});
        return iTotal;
      }
    }))
    .actions(self => ({
      addBook(data) {
        try {
          data.AantalVerkocht = parseInt(data.AantalVerkocht);
          mobxStateTree.typecheck(Boek, data);
          self.Boeken.push(data);
        } catch(err) {
          console.log(err);
        }
      },
      saveState() {
        localStorage.setItem("boeken", JSON.stringify(mobxStateTree.getSnapshot(self)));
      },
      recoverState() {
        mobxStateTree.applySnapshot(self, JSON.parse(localStorage.getItem("boeken")));
      },
      goToStepInHistory(index) {
        mobxStateTree.applySnapshot(self, historyStore.states[index]);
      }
    }))

    // Creëer de BoekStore
    const boekStore = BoekStore.create(mockData);

    mobxStateTree.onSnapshot(boekStore, snapshot => historyStore.addHistoryState(snapshot));

    // mobxStateTree.onSnapshot(boekStore, console.dir);

    // mobxStateTree.onPatch(boekStore, console.dir);

    return boekStore;

});