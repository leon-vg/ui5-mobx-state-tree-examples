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