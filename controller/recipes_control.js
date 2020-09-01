"use strict";
const fhwWeb = require('fhw-web');

module.exports = {
  /** laedt alle Rezepte aus dem data-Speicher und stellt sie auf der Uebersichtsseite dar*/
  "loadRecipes": function(data) {
  
    // style-Parameter fuer Anzeigeart der Uebersicht
    const style = data.request.get.style;
    // Rezepte aus dem data-Speicher
    const allRecipes = fhwWeb.loadJson("recipes");
  
    // je nach Darstellungart, die passende Seite mit den Daten zurueckgeben
    if(style === "grid"){
      return ({
        "page": "recipes_grid.hbs",
        "data": {
          "recipes": allRecipes
        }
      });
    } else if(style === "list") {
        return ({
          "page": "recipes_list.hbs",
          "data": {
            "recipes": allRecipes
          }
        });
    } else {
      return ({
        redirect: "/page-not-found"
      });
    }

  },
  /** laedt die Rezeptdaten und stellt sie auf der Detailseite dar*/
  "loadDetail": function(data) {
    
    // Rezepte aus dem data-Speicher
    const allRecipes = fhwWeb.loadJson("recipes");
    // der name parameter des Rezeptes
    const searchedName = data.request.get.name;
    // das Datenobjekt des zugehoerigen Rezeptes
    const searchedRecipe = allRecipes.find(p => p.ressource === searchedName);

    if(searchedRecipe){
  
      return ({
        "page": "recipe_detail.hbs",
        "data": {
          "allRecipes": allRecipes,
          "recipe": searchedRecipe
          }
      });
    
    } else {
        return ({
        redirect: "/page-not-found"
      });
  }
  
},
/**realisiert die Suche auf der Uebersichtsseite 
 * alle Daten filtern nach vorhanden Substring
 * Listen der Suchergebnisse zusammenfügen
  *den eingebeben Suchbegriff auswerten und mit Daten abgleichen
*/
 "loadSearch": function(data) {

  /*Das eingegeben Suchwort in Kleinschreibung*/
  const keyword = data.request.post.keyword.toLowerCase();
  let recipes_data = fhwWeb.loadJson("recipes");

  /**fuegt das uebergebene Element hinzu wenn es in search noch nicht vorhanden ist 
  * @param i - das Rezept das hinzugefuegt werden soll
  */
  const addToResultDistinct = function(i) {
    if(!search.includes(i)){
      search.push(i);
    }
  };

  /* fuegt die Werte der uebergebenen Liste in die search Liste hinzu 
  * @param listFromFunc - erzeugtes Array aus der Funktion
  */
  const addNewResults= function(listFromFunc) {
      //tempResult = func;
      if(search.length === 0){
        search = listFromFunc;
      }
      else{
        listFromFunc.forEach(addToResultDistinct);
      }  
    
  };

  // Liste der Treffer fuer die Suche
  let search = [];
  
  // Kriterium Rezeptname ausgewaehlt
  if(data.request.post.recipe !== undefined){
    search = recipes_data.filter(p => p.title.toLowerCase().includes(keyword));
  }
  // Kriterium Zutaten ausgewaehlt
  if(data.request.post.ingredient !== undefined){
    addNewResults(recipes_data.filter(p => p.ingredients.some(i => i.name.toLowerCase().includes(keyword))));
  }
  // Kriterium Kategorien ausgewaehlt
  if(data.request.post.categories !== undefined){
    addNewResults(recipes_data.filter(p => p.categories.some(i => i.toLowerCase().includes(keyword))));
  }
  // Kriterium Tags ausgewaehlt
  if(data.request.post.tags !== undefined){
    addNewResults(recipes_data.filter(p => p.tags.some(i => i.toLowerCase().includes(keyword))));
  }


  if(data.request.get.style === "list"){
    return ({
      "page": "recipes_list.hbs",
      "data": {
        "recipes": search
      }
    });

  }
  else {
    return ({
      "page": "recipes_grid.hbs",
      "data": {
        "recipes": search
      }
    });
  }

  
},
/* laedt nicht-gefunden Seite mit Produktdaten fuer den Slider */ 
"notFound": function(data){
  const allRecipes = fhwWeb.loadJson("recipes");
  return ({
    "page": "page-not-found.hbs",
    "status": 404,
    "data": {
      "allRecipes": allRecipes
    }
  });
}
}
