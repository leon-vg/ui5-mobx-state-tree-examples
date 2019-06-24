// global mobxStateTree
sap.ui.define([], function() {
    "use strict";
    
    const types = mobxStateTree.types;

    return types.model("Boek", {
        Naam: types.string,
        Auteur: types.string,
        DatumUitgifte: types.Date,
        AantalVerkocht: types.integer
    })
    .actions(self => ({
        addSoldBook() {
            self.AantalVerkocht++;
        },
        removeSoldBook() {
            if (self.AantalVerkocht > 0) {
                self.AantalVerkocht--;
            }
        }
    }))

});