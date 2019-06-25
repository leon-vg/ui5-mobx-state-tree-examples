// global mobxStateTree
sap.ui.define([], function() {
    "use strict";
    
    const types = mobxStateTree.types;

    return types.model("Book", {
        name: types.string,
        author: types.string,
        dateReleased: types.Date,
        amountSold: types.integer
    })
    .views(self => ({
        get bestseller () {
            return self.amountSold >= 15;
        } 
    }))
    .actions(self => ({
        addSoldBook() {
            self.amountSold++;
        },
        removeSoldBook() {
            if (self.amountSold > 0) {
                self.amountSold--;
            }
        }
    }));

});