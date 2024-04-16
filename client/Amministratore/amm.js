"use strict"





async function inserisciCollegio(){


     /**
   * PARTE AGGIUNTA , CHIAMATA IN POST
   */

  // Definisci i dati da inviare nel corpo della richiesta
  let dati = {
    parametro: valoreDelParametro,
  };

  // Opzioni per la richiesta
  let opzioni = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specifica che il corpo della richiesta è in formato JSON
    },
    body: JSON.stringify(dati), // Trasforma i dati in formato JSON per il corpo della richiesta
  };

  // Effettua la chiamata POST
  let risposta3 = await fetch("/index.php?action=inserisciCollegio", opzioni);

  let testo3 = await risposta3.json();
  console.log(testo3);
}