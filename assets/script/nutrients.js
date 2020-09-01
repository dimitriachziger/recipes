"use strict";
/*Script realisiert das Ein- und Ausblenden der  Naehrwertinformationen*/

// Naehrwertsymbol
const icon = document.querySelector('#nutrients_icon');
// Neahwerte
const nutrients = Array.from(document.querySelectorAll('.nutrients'));
// Container der Naehrwerte
const nutrientsContainer = document.querySelector('#nutrientsContainer');
// Fortschrittsbalken
const bars = document.querySelectorAll('.progressBar');

/* Balken erhalten je nach Wert eine Farbe */ 
bars.forEach(element => {
    let val = element.dataset["value"];
    if(val < "20"){
        element.style.background = "green";
    } else if(val < "40"){
        element.style.background = "yellow";
    } else{
        element.style.background = "red";
    }
    element.style.width = val + "px";
});

/** Maus uberfaehrt das Naehrwertsymbol */
icon.addEventListener('mouseenter', function(event) {
    nutrientsContainer.style.visibility = "visible";
}); 

/** Maus verlaesst das Naehrwertsymbol */
icon.addEventListener('mouseout', function(event) {
    nutrientsContainer.style.visibility = "collapse";
}); 


