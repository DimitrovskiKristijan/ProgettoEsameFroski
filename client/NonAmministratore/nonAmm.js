"use strict";

window.onload = async () => {
  let hideStorico = document.getElementById("hideStorico"); // Ottieni il bottone "Visualizza Storico"
  hideStorico.style.display = "none";
  let hidePresenza = document.getElementById("hidePresenza"); // Ottieni il bottone "PRESENZA"
  hidePresenza.style.display = "none";

  //INIZIALIZZO VARIABILI
  document.getElementById("btnLogout").addEventListener("click", logout);
  //document.getElementById("btnPresenza").addEventListener("click", presenza);  RIVEDII!!!!!!!!!!!

  document.getElementById("btnIndietro").addEventListener("click", function () {
    // Nascondi l'elemento con l'ID "hidePresenza"
    document.getElementById("hidePresenza").style.display = "none";
    // Nascondi l'elemento con l'ID "hideStorico"
    document.getElementById("hideStorico").style.display = "none";
    // Mostra l'elemento con l'ID "hideVAI"
    document.getElementById("hideVAI").style.display = "block";
  });
  document
    .getElementById("btnStorico")
    .addEventListener("click", visualizzaStorico);

  // Aggiungi un gestore di eventi click al pulsante con l'ID "btnVAI"
  document.getElementById("btnVAI").addEventListener("click", function () {
    // Nascondi l'elemento con l'ID "hideVAI"
    document.getElementById("hideVAI").style.display = "none";
    // Mostra l'elemento con l'ID "hidePresenza"
    document.getElementById("hidePresenza").style.display = "block";
  });

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

  // Output dei dati
  let userInfo = document.getElementById("userInfo");
  userInfo.innerText = `BENVENUTO \n ${nome}, ${cognome} `;
  let userHead = document.getElementById("userHead");
  userHead.innerText = ` ${nome} ${cognome} `;
};
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Funzione per gestire la presenza
async function presenza() {
  let divToHide = document.getElementById("btnPresenza");
  let divToHide2 = document.querySelector("h3");
  let btnStorico = document.getElementById("btnStorico");

  let nome = localStorage.getItem("nome");
  let cognome = localStorage.getItem("cognome");
  let email = localStorage.getItem("email");

  // Invio una richiesta al server per registrare la presenza dell'utente
  let response = await fetch("/index.php?action=registraPresenza", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome: nome, cognome: cognome, email: email }), // Invio il nome, cognome ed email dell'utente al server
  });

  let data = await response.json();

  if (data.error) alert(data.error);
  // Controllo la risposta
  if (response.ok) {
    console.log("Presenza registrata con successo");
    // Mostra il bottone "Visualizza Storico" solo se l'utente ha firmato la presenza
    btnStorico.style.display = "block";
  } else {
    console.error(
      "Registrazione della presenza fallita con status:",
      response.status
    );
  }
  // Aggiungi una classe CSS che nasconde l'elemento
  divToHide.style.display = "none";
  divToHide2.style.display = "none";
}

// Funzione per visualizzare lo storico delle presenze

async function visualizzaStorico() {
  popolaAnniScolastici();

  let divStorico = document.getElementById("hideStorico");
  divStorico.style.display = "block";

  document
    .getElementById("annoScolastico")
    .addEventListener("change", async function () {
      let annoScolastico = this.value;

      let response = await fetch(
        "/index.php?action=ottieniDatiPerAnnoScolastico",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ annoScolastico: annoScolastico }), // Invia l'anno scolastico selezionato al server
        }
      );

      if (response.ok) {
        let dati = await response.json();
        console.log("Dati per l'anno scolastico " + annoScolastico + ":", dati);

        // Aggiorna la tua interfaccia utente con i dati ricevuti
      } else {
        console.error(
          "Ottenimento dei dati per l'anno scolastico fallito con status:",
          response.status
        );
      }
    });
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
    let divPresenza = document.getElementById("hidePresenza");
    divPresenza.style.display = "none";
    let divStorico = document.getElementById("hideStorico");
    divStorico.style.display = "block";
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
    let header3 = document.createElement("th");
    header3.textContent = "Anno Scolastico"; // Nuovo campo
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3); // Aggiungi il nuovo campo all'intestazione
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
      let cell3 = document.createElement("td");
      cell3.textContent = presenza.Anno_Scolastico; // Assicurati che questo campo esista nel tuo oggetto storico
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3); // Aggiungi il nuovo campo alla riga
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
// Funzione per ottenere e popolare gli anni scolastici
async function popolaAnniScolastici() {
  try {
    // CHIAMATA PER OTTENERE GLI ANNI SCOLASTICI
    let risposta2 = await fetch("/index.php?action=getAnno");
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
// Funzione per gestire il logout
async function logout() {
  try {
    console.log("click");
    let response = await fetch("/index.php?action=logout.php", {
      method: "POST",
    });

    if (response.ok) {
      console.log("Logged out successfully");
      window.location.href = "/index.php";
    } else {
      console.error("Logout failed with status:", response.status);
    }

    // Leggo la risposta
    let textResponse = await response.text();
    console.log("Server response:", textResponse);
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
}
