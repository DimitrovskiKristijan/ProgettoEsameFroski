"use strict";
window.onload = async () => {
  //INIZIALIZZO VARIABILI
  console.log("Sei nel Reparto Amministratore!!");
  document.getElementById("btnLogout").addEventListener("click", logout);
  document.getElementById("btnInserisciCollegio");

  document
    .getElementById("btnInvia")
    .addEventListener("click", async function (event) {
      console.log("click");
      event.preventDefault(); // Previene il comportamento di default del form (che sarebbe il refresh della pagina)
      await inserisciCollegio(); // Chiama la funzione per inviare i dati al server
    });

  //faccio il localStorage per prendere il nome e il cognome
  let nome = localStorage.getItem("nome");
  console.log("Nome:" + nome);

  let cognome = localStorage.getItem("cognome");
  console.log("COgnome:" + cognome);

  let email = localStorage.getItem("email");
  console.log("Email: " + email);

  let id = localStorage.getItem("id");
  console.log("ID: " + id);
  // Output dei dati
  let userInfo = document.getElementById("userInfo");
  userInfo.innerText = `BENVENUTO [ ${nome}, ${cognome} ]`;
};

// Funzione per inserire un collegio
async function inserisciCollegio() {
  // Raccogli i dati dal form
  let form = document.getElementById("FormId"); // Sostituisci 'formId' con l'ID del tuo form
  let formData = new FormData(form);

  // Trasforma i dati del form in un oggetto JavaScript
  let dati = {};
  formData.forEach((value, key) => (dati[key] = value));
  console.log(dati);

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

async function mostraModal() {
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
