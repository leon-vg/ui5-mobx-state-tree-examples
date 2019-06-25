sap.ui.define([], function() {
	"use strict";
	return {
		bookToAdd: {
			name: "",
			author: "",
			dateReleased: new Date(),
			amountSold: 0
		},
		books: [{
			name: "Great stories I",
			author: "A. Cooijmans",
			dateReleased: new Date("11-02-1990"),
			amountSold: 10
		}, {
			name: "Great stories I",
			author: "A. Cooijmans",
			dateReleased: new Date("05-22-1991"),
			amountSold: 10
		}, {
			name: "Children's stories",
			author: "K. Leuzen",
			dateReleased: new Date("01-22-1992"),
			amountSold: 10
		}, {
			name: "Little Red Riding Hood",
			author: "B. van Loon",
			dateReleased: new Date("09-26-1996"),
			amountSold: 10
		}, {
			name: "De Big Friendly Giant",
			author: "P. Auteuring",
			dateReleased: new Date("08-30-1998"),
			amountSold: 10
		}],
		get bestsellers(){
			return this.books.filter((oBook) => { return oBook.amountSold >= 15;});
		},
		get totalNumberSoldBooks() {
			var iTotal = 0;
			this.books.map((oBook) => { iTotal = iTotal + oBook.amountSold;});
			return iTotal;
		}
	};
});