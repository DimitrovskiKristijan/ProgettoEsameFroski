"use strict";
window.onload = async () => {
  //INIZIALIZZO VARIABILI

  visualizzaStorico();

  //faccio il localStorage per prendere il nome e il cognome
  let nome = localStorage.getItem("nome");
  console.log("Nome:" + nome);

  let cognome = localStorage.getItem("cognome");
  console.log("COgnome:" + cognome);

  let email = localStorage.getItem("email");
  console.log("Email: " + email);

  //verifico se è un non amministratore o un docente esterno
  if (email.includes("@vallauri.edu")) {
    console.log("Non amministratore");
  } else {
    console.log("Sei un docente esterno");
  }

  let id = localStorage.getItem("id");
  console.log("ID: " + id);
};

// Funzione per visualizzare lo storico delle presenze

async function visualizzaStorico() {
  // Ottieni l'email dell'utente dal localStorage
  let email = localStorage.getItem("email");

  // Invia una richiesta al server per ottenere lo storico delle presenze dell'utente
  let response = await fetch("/index.php?action=ottieniStorico", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }), // Invia l'email dell'utente al server
  });

  // Controlla la risposta
  if (response.ok) {
    //&& window.location.pathname.endsWith("Storico.html")
    // Ottieni lo storico delle presenze dal corpo della risposta
    let storico = await response.json();
    console.log("Storico delle presenze:", storico);

    // Crea una tabella HTML per visualizzare lo storico delle presenze
    let table = document.createElement("table");
    table.className = "table table-success table-striped custom-font"; // Aggiungi le classi di Bootstrap

    // Crea l'intestazione della tabella
    let thead = document.createElement("thead");
    thead.className = "thead-dark"; // Aggiungi la classe di Bootstrap
    let headerRow = document.createElement("tr");
    let header1 = document.createElement("th");
    header1.textContent = "Data Collegio";
    let header2 = document.createElement("th");
    header2.textContent = "Data/Ora Registrazione";
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crea il corpo della tabella
    let tbody = document.createElement("tbody");
    for (let presenza of storico) {
      let row = document.createElement("tr");
      let cell1 = document.createElement("td");
      cell1.textContent = presenza.Data_Collegio;
      let cell2 = document.createElement("td");
      cell2.textContent = presenza.DataOra_Registrazione;
      row.appendChild(cell1);
      row.appendChild(cell2);
      tbody.appendChild(row);
    }
    table.appendChild(tbody);

    // Seleziona il div con la classe "storico" e aggiungi la tabella a questo div
    let storicoDiv = document.querySelector(".storico");
    storicoDiv.appendChild(table);
  } else {
    console.error(
      "Ottenimento dello storico delle presenze fallito con status:",
      response.status
    );
  }
}
