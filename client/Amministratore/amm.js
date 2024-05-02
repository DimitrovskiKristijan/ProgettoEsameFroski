"use strict";
window.onload = async () => {
  //INIZIALIZZO VARIABILI
  console.log("Sei nel Reparto Amministratore!!");

  visualizzaCollegi();

  document.getElementById("btnLogout").addEventListener("click", logout);

  //faccio il localStorage per prendere il nome e il cognome
  let nome = localStorage.getItem("nome");
  console.log("Nome:" + nome);

  let cognome = localStorage.getItem("cognome");
  console.log("Cognome:" + cognome);

  let email = localStorage.getItem("email");
  console.log("Email: " + email);

  let id = localStorage.getItem("id");
  console.log("ID: " + id);
  // Output dei dati
  let userInfo = document.getElementById("userInfo");
  userInfo.innerText = `BENVENUTO [ ${nome}, ${cognome} ]`;

  // Aggiungi un event listener al pulsante
  document
    .getElementById("btnInvia")
    .addEventListener("click", inserisciCollegio);
};

async function mostraCollegi() {
  //visualizza il modal
  let creaCollegioModal = new bootstrap.Modal(
    document.getElementById("creaCollegioModal")
  );
  //mostra il modal e azzera i campi
  creaCollegioModal.show();
  document
    .getElementById("creaCollegioModal")
    .addEventListener("hidden.bs.modal", function (event) {
      // Trova tutti gli elementi input nel modal e li azzera
      let inputs = this.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
    });

  // Aggiungi un event listener al bottone di invio del form
  let btnInvia = document.getElementById("btnInvia");
  btnInvia.disabled = false;

  document
    .getElementById("btnInvia")
    .addEventListener("click", inserisciCollegio);
}

// Funzione per inserire un collegio
async function inserisciCollegio() {
  // Raccogli i dati dal form
  let form = document.getElementById("FormId");
  // Ottieni i valori degli input
  let titolo = form.elements.title.value;
  let Ora_Inizio = form.elements.Ora_Inizio.value;
  let Ora_Fine = form.elements.Ora_Fine.value;
  let data = form.elements.date.value;
  let file = form.elements.file.files[0]; // Questo è un file, quindi usiamo .files[0] per ottenere il primo file

  // Controlla se i campi obbligatori sono stati compilati
  if (!titolo || !data) {
    alert("Per favore, compila tutti i campi obbligatori [Titolo, Data].");
    return; // Interrompe l'esecuzione della funzione
  }

  // Controlla se il file è di tipo .csv o .xml
  if (file && !["text/csv", "text/xml"].includes(file.type)) {
    alert("Per favore, carica un file di tipo .csv o .xml.");
    return; // Interrompe l'esecuzione della funzione
  }

  // Crea un oggetto FormData
  let dati = new FormData();
  dati.append("titolo", titolo);
  dati.append("Ora_Inizio", Ora_Inizio);
  dati.append("Ora_Fine", Ora_Fine);
  dati.append("Data_Collegio", data);
  dati.append("file", file);

  // Verifica se esiste già un collegio con lo stesso titolo, data e file
  /*
  let verifica = await fetch("/index.php?action=verificaCollegio", {
    method: "POST",
    body: dati,
  });
  let esisteGia = await verifica.json();
  console.log("Esiste già un collegio con questi dati?", esisteGia);

  if (esisteGia) {
    alert("Un collegio con lo stesso titolo, data e file esiste già.");
    return; // Interrompe l'esecuzione della funzione
  }
*/
  // Logga l'oggetto dati
  //console.log(dati);

  for (let [key, value] of dati.entries()) {
    console.log(key, value);
  }

  // Opzioni per la richiesta
  let opzioni = {
    method: "POST",
    body: dati, // Usa l'oggetto FormData come corpo della richiesta
  };

  // Effettua la chiamata POST
  let collegio = await fetch("/index.php?action=inserimentoCollegi", opzioni);

  // Controlla se la risposta è ok e se ha contenuto
  if (collegio.ok && collegio.headers.get("Content-Length") > 0) {
    let busta = await collegio.json();
    console.log(busta);
    alert("Collegio creato con successo"); // Aggiungi l'alert qui
    // Disabilita il bottone di invio
    let btnInvia = document.getElementById("btnInvia");
    btnInvia.disabled = true;
  } else {
    console.log("No JSON to parse or response not OK");
  }
  // Riabilita il bottone di invio
  //btnInvia.disabled = false;
}

// Funzione per ottenere e visualizzare i collegi
async function visualizzaCollegi() {
  // CHIAMATA PER OTTENERE I COLLEGI
  let risposta2 = await fetch("/index.php?action=getCollegi");
  let collegi = await risposta2.json();
  console.log(collegi);

  // Crea una tabella di Bootstrap e aggiungi i collegi
  let table = document.createElement("table");
  table.className = "table table-success table-striped custom-font"; // Aggiungi le classi di Bootstrap qui
  table.innerHTML = `
    <thead>
      <tr>
        <th>Titolo</th>
        <th>Data</th>
        <th>Inizio</th>
        <th>Fine</th>
        <th>File</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  let tbody = table.querySelector("tbody");

  collegi.forEach((collegio) => {
    console.log(collegio); // Aggiungi questa riga per stampare un collegio di esempio
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${collegio.Titolo}</td>
      <td>${collegio.Data_Collegio}</td>
      <td>${collegio.Ora_Inizio}</td>
      <td>${collegio.Ora_Fine}</td>
      <td>${collegio.File_CSV}</td>
    `;
   // Aggiungi l'evento click alla riga
   row.addEventListener("click", function() {
    // Chiamata alla funzione visDatiCollegio2 con i valori della riga corrente
    visDatiCollegio2(collegio.Titolo, collegio.Data_Collegio, collegio.Ora_Inizio, collegio.Ora_Fine);
});
tbody.appendChild(row);
  });

  // Aggiungi la tabella al div
  let divVecchi = document.querySelector(".vecchi");
  divVecchi.appendChild(table);
}

//Funzione per mostrare le presenze
async function mostraPresenze() {
  //visualizza il modal
  let creaCollegioModal = new bootstrap.Modal(
    document.getElementById("creaPresenzeModal")
  );
  //mostra il modal e azzera i campi
  creaCollegioModal.show();
  document
    .getElementById("creaPresenzeModal")
    .addEventListener("hidden.bs.modal", function (event) {
      // Trova tutti gli elementi input nel modal e li azzera
      let inputs = this.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
    });

  // Aggiungi un event listener al bottone di invio del form
  let btnInvia = document.getElementById("btnInvia");
  btnInvia.disabled = false;

  document
    .getElementById("btnInvia")
    .addEventListener("click", inserisciCollegio);
}

// Funzione per gestire il logout
async function logout() {
  try {
    console.log("click");
    let nome = localStorage.getItem("nome");
    let response = await fetch("/index.php?action=logout.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
      }),
    });

    if (response.ok) {
      console.log("Logged out successfully");
      window.location.href = "/index.php";
    } else {
      console.error("Logout failed with status:", response.status);
    }

    // Leggi la risposta come testo
    let textResponse = await response.text();
    console.log("Server response:", textResponse);
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
}

/****************************************************************************************************************************** */

function visDatiCollegio2(titolo, dataCollegio, oraInizio, oraFine) {
  
  console.log("Titolo:", titolo);
  console.log("Data del collegio:", dataCollegio);
  console.log("Ora di inizio:", oraInizio);
  console.log("Ora di Fine:", oraFine);

let ModificaCollegioModal = new bootstrap.Modal(
  document.getElementById("ModificaCollegioModal")
);
//mostra il modal e azzera i campi
ModificaCollegioModal.show();




document.getElementById("btnModifica").addEventListener("click", async function() {
  console.log("Modifica cliccata");
  
  let objDati = {
    titolo: titolo,
    dataCollegio: dataCollegio,
    oraInizio: oraInizio,
    oraFine: oraFine,
  };

  console.log(objDati);

  let opzioni = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specifica che il corpo della richiesta è in formato JSON
    },
    body: JSON.stringify(objDati), // Trasforma i dati in formato JSON per il corpo della richiesta
  };

  // CHIAMATA PER IL CONTROLLO DEL RUOLO UTENTE
  let risposta3 = await fetch("/index.php?action=modificaCollegio", opzioni);

  let testo3 = await risposta3.json();
  console.log(testo3);



});

  
}