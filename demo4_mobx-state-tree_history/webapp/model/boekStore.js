// global mobxStateTree
sap.ui.define([
  "./Boek", 
  "MobXExampleProject/mockData/mockData"
], function(Boek, mockData) {
    "use strict";
    const dateParser = function (key, value) {
      var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
      if (typeof value === 'string') {
          var a = reISO.exec(value);
          if (a)
              return new Date(value);
          a = reMsAjax.exec(value);
          if (a) {
              var b = a[1].split(/[-+,.]/);
              return new Date(b[0] ? +b[0] : 0 - +b[1]);
          }
      }
      return value;
    };
    const types = mobxStateTree.types;

    // Definitie van een BoekStore
    const BoekStore = types.model("BoekStore", {
        Boeken: types.array(Boek),
        history: types.array(types.frozen()),
        currentStep: -1
    })
    .views(self => ({
      get historyLength() {
        return self.history.length - 1;
      },
      get BoekenView() {
        if (self.currentStep === self.history.length - 1) {
          return self.Boeken;
        } else {
          let historyState = self.history[self.currentStep];
          // Bugfix - date-field is a timestamp in a snapshot, so we need to make it a Date again to prevent errors
          historyState.forEach((book) => book.DatumUitgifte = new Date(book.DatumUitgifte));
          return self.history[self.currentStep];
        }
      },
      get BestSellers(){
        return self.BoekenView.filter((oBook) => { return oBook.AantalVerkocht >= 15;});
      },
      get TotaalAantalVerkochteBoeken() {
        var iTotal = 0;
        self.BoekenView.forEach((oBook) => { iTotal = iTotal + oBook.AantalVerkocht;});
        return iTotal;
      }
    }))
    .actions(self => ({
      addBook(data) {
        try {
          console.log("addBook");
          data.AantalVerkocht = parseInt(data.AantalVerkocht);
          mobxStateTree.typecheck(Boek, data);
          self.Boeken.push(data);
        } catch(err) {
          console.log(err);
        }
      },
      saveState() {
        console.log("saveState");
        localStorage.setItem("boeken", JSON.stringify(mobxStateTree.getSnapshot(self)));
      },
      recoverState() {
        console.log("recoverState");
        mobxStateTree.typecheck(BoekStore, JSON.parse(localStorage.getItem("boeken"), dateParser));
        mobxStateTree.applySnapshot(self, JSON.parse(localStorage.getItem("boeken"), dateParser));
      },
      addHistoryState(state) {
        console.log("addHistoryState");
        self.history.push(state);
        self.currentStep++;
      },
      setCurrentStep(i) {
        self.currentStep = i;
      }
    }));

    // Creëer de BoekStore
    const boekStore = BoekStore.create(mockData);

    mobxStateTree.onSnapshot(boekStore.Boeken, snapshot => {
      console.log("onSnapshot");
      boekStore.addHistoryState(snapshot)
    });
    boekStore.addHistoryState(mobxStateTree.getSnapshot(boekStore.Boeken));

    // mobxStateTree.onSnapshot(boekStore, console.dir);

    // mobxStateTree.onPatch(boekStore, console.dir);

    return boekStore;

});