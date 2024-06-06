"use strict";
let collegioCorrente = null;

window.onload = async () => {
  //INIZIALIZZO VARIABILI
  console.log("Sei nel Reparto Amministratore!!");

  popolaAnniScolastici();
  visualizzaCollegi();

  document.getElementById("btnLogout").addEventListener("click", logout);

  //faccio il localStorage per prendere il nome e il cognome
  let nomeCognome = localStorage.getItem("nome e cognome");
  console.log("Nome e Cognome: " + nomeCognome);

  let email = localStorage.getItem("email");
  console.log("Email: " + email);

  let id = localStorage.getItem("id");
  console.log("ID: " + id);

  // Output dei dati
  let userInfo = document.getElementById("userInfo");
  userInfo.innerText = `BENVENUTO \n ${nomeCognome} `;
  let userHead = document.getElementById("userHead");
  userHead.innerText = ` ${nomeCognome} `;

  // Aggiungi un event listener al pulsante
  document
    .getElementById("btnInvia")
    .addEventListener("click", inserisciCollegio);
};

// Funzione per ottenere e popolare gli anni scolastici
async function popolaAnniScolastici() {
  try {
    // CHIAMATA PER OTTENERE GLI ANNI SCOLASTICI
    let risposta2 = await fetch("/index.php?action=getAnnoCollegi");
    let anniScolastici = await risposta2.json();
    console.log(anniScolastici);

    // Ottieni il riferimento all'elemento select
    let selectAnnoScolastico = document.getElementById("annoScolastico");

    // Aggiungi un event listener all'elemento select
    selectAnnoScolastico.addEventListener("change", function () {
      filtraDati(this.value);
    });

    // Pulisci l'elemento select
    selectAnnoScolastico.innerHTML = "";

    // Aggiungi l'opzione "Visualizza tutti"
    let optionAll = document.createElement("option");
    optionAll.value = "";
    optionAll.text = "Visualizza tutti";
    selectAnnoScolastico.appendChild(optionAll);

    // Aggiungi un'opzione per ogni anno scolastico
    anniScolastici.data.forEach((annoScolastico) => {
      let option = document.createElement("option");
      option.value = annoScolastico.Anno_Scolastico;
      option.text = annoScolastico.Anno_Scolastico;
      selectAnnoScolastico.appendChild(option);
    });
  } catch (error) {
    console.error("c'è un problema:", error);
  }
}

// Funzione per filtrare i dati
async function filtraDati(annoScolastico) {
  try {
    // Ottieni il riferimento alla tabella e alle righe del corpo
    let table = document.querySelector(".vecchi table");
    let rows = table.querySelectorAll("tbody tr");

    // Mostra/Nascondi le righe in base all'anno scolastico selezionato
    rows.forEach((row) => {
      let cell = row.querySelector("td:nth-child(1)"); // Assume che l'anno scolastico sia nella prima colonna
      if (cell.textContent === annoScolastico || annoScolastico === "") {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  } catch (errore) {
    console.error("Si è verificato un errore:", errore);
  }
}

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

  // Controlla se il file ha un'estensione .csv, .xls o .xlsx
  if (file && !/\.(csv|xls|xlsx)$/i.test(file.name)) {
    alert("Per favore, carica un file di tipo .csv, .xls o .xlsx.");
    return; // Interrompe l'esecuzione della funzione
  }

  // Crea un oggetto FormData
  let dati = new FormData();
  dati.append("titolo", titolo);
  dati.append("Ora_Inizio", Ora_Inizio);
  dati.append("Ora_Fine", Ora_Fine);
  dati.append("Data_Collegio", data);
  dati.append("file", file);

  for (let [key, value] of dati.entries()) {
    console.log(key, value);
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
    let modal = document.getElementById("creaCollegioModal");
    modal.style.display = "none";
    window.location.reload();
  } else {
    console.log("No JSON to parse or response not OK");
  }
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
      <th>Anno Scolastico</th>
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
      <td>${collegio.Anno_Scolastico}</td>
      <td>${collegio.Titolo}</td>
      <td>${collegio.Data_Collegio}</td>
      <td>${collegio.Ora_Inizio}</td>
      <td>${collegio.Ora_Fine}</td>
      <td>${collegio.File_CSV}</td>
    `;
    // Aggiungi l'evento click alla riga
    row.addEventListener("click", function () {
      // Chiamata alla funzione visDatiCollegio2 con i valori della riga corrente
      visDatiCollegio2(
        collegio.Titolo,
        collegio.Data_Collegio,
        collegio.Ora_Inizio,
        collegio.Ora_Fine,
        collegio.File_CSV
      );
    });
    tbody.appendChild(row);
  });

  // Aggiungi la tabella al div
  let divVecchi = document.querySelector(".vecchi");
  divVecchi.appendChild(table);
}

// Funzione per ottenere l'ID_Collegio da un server
async function getID_Collegio() {
  let email = localStorage.getItem("email");
  let response = await fetch("/index.php?action=getID_Collegio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  let data = await response.json();

  if (data.error) alert(data.error);

  if (response.ok) {
    return data.ID_Collegio;
  } else {
    console.error(
      "Recupero dell'ID_Collegio fallito con status:",
      response.status
    );
    return null;
  }
}

async function mostraPresenze(idDocente) {
  let idCollegio = await getID_Collegio();
  let btnInvia = document.getElementById("btnInvia");
  btnInvia.disabled = false;

  document
    .getElementById("btnVisualizzaPresenze")
    .addEventListener("click", async function () {
      let response = await fetch("/index.php?action=verificaPresenze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verificaPresenzaDocente",
          idDocente: idDocente,
          idCollegio: idCollegio,
        }),
      });

      if (!response.ok) {
        console.error(
          "Errore durante il recupero delle informazioni sulla presenza:",
          response.status
        );
        return;
      }

      let presenze = await response.json();
      console.log(presenze);
      console.log("ID_Collegio:", idCollegio);

      presenze.forEach((presenza) => {
        console.log("ID_col:", presenza.ID_Collegio);

        if (presenza.ID_Collegio === idCollegio) {
          console.log(
            `Il docente ${presenza.NomeCognome} ha firmato nel collegio corretto.`
          );
          alert(
            `Il docente ${presenza.NomeCognome} ha firmato nel collegio corretto.`
          );
        } else {
          console.log(
            `Il docente ${presenza.NomeCognome} ha firmato nel collegio corretto.`
          );
          alert(
            `Il docente ${presenza.NomeCognome} non ha firmato nel collegio corretto.`
          );
        }
      });
    });
}

/****************************************************************************************************************************** */

function visDatiCollegio2(titolo, dataCollegio, oraInizio, oraFine, File_CSV) {
  console.log("Titolo:", titolo);
  console.log("Data del collegio:", dataCollegio);
  console.log("Ora di inizio:", oraInizio);
  console.log("Ora di Fine:", oraFine);
  console.log("File:", File_CSV);

  let ModificaCollegioModal = new bootstrap.Modal(
    document.getElementById("ModificaCollegioModal")
  );
  // Mostra il modal e azzera i campi
  ModificaCollegioModal.show();

  document
    .getElementById("btnModifica")
    .addEventListener("click", async function () {
      console.log("Modifica cliccata");

      let modal = new bootstrap.Modal(document.getElementById("Modifica"));
      modal.show();

      document.getElementById("titleModifica").value = titolo;
      document.getElementById("Ora_InizioModifica").value = oraInizio;
      document.getElementById("Ora_FineModifica").value = oraFine;
      document.getElementById("dateModifica").value = dataCollegio;
      // document.getElementById("fileModifica").value = File_CSV; // Rimuoviamo questa linea

      document
        .getElementById("btnEseguiModifica")
        .addEventListener("click", async function () {
          console.log("Modifica cliccata");

          let titoloModificato = document.getElementById("titleModifica").value;
          let oraInizioModificato =
            document.getElementById("Ora_InizioModifica").value;
          let oraFineModificato =
            document.getElementById("Ora_FineModifica").value;
          let DataModificato = document.getElementById("dateModifica").value;
          let fileModificato = document.getElementById("fileModifica").files[0]; // Ottieni il file selezionato

          let objDati = {
            titolo: titolo,
            dataCollegio: dataCollegio,
            oraInizio: oraInizio,
            oraFine: oraFine,
            titoloModificato: titoloModificato,
            oraInizioModificato: oraInizioModificato,
            oraFineModificato: oraFineModificato,
            DataModificato: DataModificato,
          };

          let formData = new FormData();
          formData.append("objDati", JSON.stringify(objDati));
          if (fileModificato) {
            formData.append("FileModificato", fileModificato);
          }

          richiamaModifica(formData);
        });
    });

  async function richiamaModifica(formData) {
    let opzioni = {
      method: "POST",
      body: formData, // Usa il FormData come corpo della richiesta
    };

    // CHIAMATA PER IL CONTROLLO DEL RUOLO UTENTE
    let risposta3 = await fetch("/index.php?action=modificaCollegio", opzioni);

    let testo3 = await risposta3.json();
    console.log(testo3);

    ModificaCollegioModal.hide();

    if (testo3.message == "Dati aggiornati con successo") {
      alert("Modifica Effettuata con successo");
      window.location.reload();
    }
  }
}

/****************************************************************************************************************************** */

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
