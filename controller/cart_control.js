"use strict";
const fhwWeb = require('fhw-web');

module.exports = {
  /**Zutaten eines Rezeptes zur Einkaufsliste hinzufuegen */
  "add_ingredientlist": function(data) {

    // id
    const recipeName = data.request.get.name;
    // Titel des Rezeptes
    const title = data.request.post.title;
    // Rezept
    const recipe = fhwWeb.loadJson("recipes").find(p => p.ressource === recipeName);
    // Zutaten des Rezeptes
    const ingredients = recipe.ingredients;
    // Portionen des Rezeptes
    const servingSize = recipe.serving_size;
    // Anzahl Portionen
    const servings = parseInt(data.request.post.servingNumber);

    // Einkaufliste leer
    if (typeof data.session.items === 'undefined') {
      // neue Liste anlegen
      data.session.items = [{}];
    
    } else {
      // Einkaufsliste ist bereits angelegt
    let currentRecipe = data.session.items.find(v => v.title === title);

      // Rezept in der Einkaufsliste
    if(typeof currentRecipe !== 'undefined'){
      currentRecipe.servings += servings;
    }

    // Rezept erstmalig
    else{ 
      const newRecipe = { "title" : title,"servings": servings, "ingredients" : [] };    

      // Werte der Zutaten verringern falls geringere Anzahl ausgewahlt
      ingredients.forEach(ingredient => {
         ingredient.value =  (ingredient.value / servingSize);
        newRecipe.ingredients.push(ingredient);
      });
      data.session.items.push(newRecipe); 
    }
    } 	
    
    return ({
          "status": 303,
          "redirect": "/recipe?name=" + data.request.get.name
    });
    

  },
    /*in der Warenkorbvorschau alle Inhalte der Tabelle zur Verfügung stellen*/
"loadCart": function(data) {

  // zusammengefasste Zutaten
  const pooledIngredients = [];
  // in der Session gespeicherte Rezeptliste
  const items = data.session.items;

  // jedes Rezept durchlaufen der Zusammenfassung hinzufuegen
  items.forEach(element => {
    // jede Zutat des Rezeptes durchlaufen
    element.ingredients.forEach(currentIngredient => {
      // pruefen ob Zutat in der Zusammenfassung vorhanden
      let ingredient = pooledIngredients.find(a => a.name === currentIngredient.name);
      //Zutat bereits vorhanden -> werte summieren
      if(ingredient !== undefined){
        ingredient.value += currentIngredient.value * element.servings;
      } else{
        // Portionenanzahl anpassen und neue Zutat der Zusammenfassung hinzufuegen
        let copyOfIngredient = { "name" : currentIngredient.name, "value": currentIngredient.value * element.servings, "unit": currentIngredient.unit};
        pooledIngredients.push(copyOfIngredient);
      }
    });

  });

  return ({
    "page": "shoppinglist.hbs",
    "data": {
      "items": items,
      "pooledIngredients": pooledIngredients
    }
  });
},
/**loescht die Zutaten eines uebergebenen Rezeptes aus der Einkaufsliste */
"deleteRecipe": function(data) {

  // Rezeptliste aus der Session
  const list = data.session.items;
  // index des zu loeschenden Rezeptes
  const index = list.indexOf(list.find(v => v.title === data.request.post.title));

  // loesche an Position index um 1 Laenge
  list.splice(index, 1);
  
  return ({
    status: 303, 
    "redirect": "/shoppinglist"
  });
  

}
}
