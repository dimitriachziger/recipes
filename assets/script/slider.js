"use strict";

/*Script realisiert Produkslider*/
/*Ansicht ist auf die ersten drei beschränkt, 4tes wird beim animieren sichtbar*/


/*alle Elemente mit passender Klasse selektieren*/
const images = Array.from(document.querySelectorAll('.slide'));
const numOfImages = images.length;

// keinen Slider bei weniger als 3 Bildern
if(numOfImages > 2){
let round = 0;

/*Funktion die ein Element der Liste anhand des Index zurueck gibt*/
function getElement(index) {
	// zu großen Index abfangen
	if (index >= numOfImages){
		return images[index-numOfImages];
	}
	return images[index];
}
 
/*setzt intervalgesteuert immer Atrribute fuer 3 Produkte und schiebt um eine Position*/
const setNext4 = function() {
	// fuer jedes Element, alle relevanten Attribute entfernen
	images.forEach(e => {
    	e.classList.remove("position0", "position1", "position2", "position3");
	});
	// fuer 4 aufeinanderfolgende Elemente die Attribute setzen
	for (let j = 0; j < 4; j++) {
		let element = getElement(j + round);
		if(typeof element !== null){
			element.classList.add("position" + j);
		}
		else{

		}
	}
	round++;
	if(round >= numOfImages){
		round = 0;
	}
};

// Initialisierung fuer sofortige Sichtbarkeit
setNext4();
 
 /*Interval der Klasse. Bei jedem Interval 4 Bilder zur sichtbaren Klasse hinzufügen*/
setInterval(function() {
	setNext4();
},5000);

} //if length < 2
else {
	const sliderContainer = document.querySelector('#slider');
	sliderContainer.style.display = "none";
}

