sap.ui.define([], function() {
	"use strict";
	return {
		BookToAdd: {
			Naam: "",
			Auteur: "",
			DatumUitgifte: new Date(),
			AantalVerkocht: 0
		},
		Boeken: [{
			Naam: "Geweldige verhalen I",
			Auteur: "A. Cooijmans",
			DatumUitgifte: new Date("11-02-1990"),
			AantalVerkocht: 10
		}, {
			Naam: "Geweldige verhalen II",
			Auteur: "A. Cooijmans",
			DatumUitgifte: new Date("05-22-1991"),
			AantalVerkocht: 10
		}, {
			Naam: "Kinderstories",
			Auteur: "K. Leuzen",
			DatumUitgifte: new Date("01-22-1992"),
			AantalVerkocht: 10
		}, {
			Naam: "Pinkeltje",
			Auteur: "B. van Loon",
			DatumUitgifte: new Date("09-26-1996"),
			AantalVerkocht: 10
		}, {
			Naam: "De Grote Vriendelijke Reus",
			Auteur: "P. Auteuring",
			DatumUitgifte: new Date("08-30-1998"),
			AantalVerkocht: 10
		}],
		get BestSellers(){
			return this.Boeken.filter((oBook) => { return oBook.AantalVerkocht >= 15;});
		},
		get TotaalAantalVerkochteBoeken() {
			var iTotal = 0;
			this.Boeken.map((oBook) => { iTotal = iTotal + oBook.AantalVerkocht;});
			return iTotal;
		}
	};
});