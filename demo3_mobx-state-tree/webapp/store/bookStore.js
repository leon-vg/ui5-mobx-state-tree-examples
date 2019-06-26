// global mobxStateTree
sap.ui.define([
  "../model/Book", 
  "MobXExampleProject/mockData/mockData"
], function(Book, mockData) {
    "use strict";
    
    const types = mobxStateTree.types;

    // Definition of a BookStore
    const BookStore = types.model("BookStore", {
        books: types.array(Book)
    })
    .views(self => ({
      get bestsellers(){
        return self.books.filter((oBook) => oBook.bestseller);
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
      }
    }))

    // Creëer de BoekStore
    const bookStore = BookStore.create(mockData);

    // mobxStateTree.onSnapshot(boekStore, console.dir);

    // mobxStateTree.onPatch(boekStore, console.dir);

    return bookStore;

});