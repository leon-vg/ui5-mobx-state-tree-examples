// global mobxStateTree
sap.ui.define([
  "../model/Book", 
  "MobXExampleProject/mockData/mockData"
], function(Book, mockData) {
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

    // Definition of a BookStore
    const BookStore = types.model("BookStore", {
        books: types.array(Book),
        history: types.array(types.frozen()),
        currentStep: -1
    })
    .views(self => ({
      get historyLength() {
        return self.history.length - 1;
      },
      get bookView() {
        if (self.currentStep === self.history.length - 1) {
          return self.books;
        } else {
          let historyState = self.history[self.currentStep];
          // Bugfix - date-field is a timestamp in a snapshot, so we need to make it a Date again to prevent errors
          historyState.forEach((book) => book.dateReleased = new Date(book.dateReleased));
          return self.history[self.currentStep];
        }
      },
      get bestsellers(){
        return self.bookView.filter((oBook) => { return oBook.amountSold >= 15;});
      },
      get totalNumberSoldBooks() {
        var iTotal = 0;
        self.books.forEach((oBook) => { iTotal = iTotal + oBook.amountSold;});
        return iTotal;
      }
    }))
    .actions(self => ({
      addBook(data) {
        try {
          data.amountSold = parseInt(data.amountSold);
          mobxStateTree.typecheck(Book, data);
          self.books.push(data);
        } catch(err) {
          console.log(err);
        }
      },
      saveState() {
        console.log("saveState");
        localStorage.setItem("books", JSON.stringify(mobxStateTree.getSnapshot(self)));
      },
      recoverState() {
        console.log("recoverState");
        mobxStateTree.typecheck(BookStore, JSON.parse(localStorage.getItem("books"), dateParser));
        mobxStateTree.applySnapshot(self, JSON.parse(localStorage.getItem("books"), dateParser));
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
    const bookStore = BookStore.create(mockData);

    mobxStateTree.onSnapshot(bookStore.books, snapshot => {
      console.log("onSnapshot");
      bookStore.addHistoryState(snapshot)
    });
    bookStore.addHistoryState(mobxStateTree.getSnapshot(bookStore.books));

    // mobxStateTree.onSnapshot(boekStore, console.dir);

    // mobxStateTree.onPatch(boekStore, console.dir);

    return bookStore;

});