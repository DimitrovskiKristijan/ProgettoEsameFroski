"use strict";
window.onload = async () => {
  //INIZIALIZZO VARIABILI
  document.getElementById("btnLogout").addEventListener("click", logout);
  document.getElementById("btnPresenza").addEventListener("click", presenza);

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

  // Output dei dati
  let userInfo = document.getElementById("userInfo");
  userInfo.innerText = `BENVENUTO [ ${nome}, ${cognome} ]`;
};

// Funzione per gestire la presenza
async function presenza() {
  // Ottieni il nome, cognome ed email dell'utente dal localStorage
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
  } else {
    console.error(
      "Registrazione della presenza fallita con status:",
      response.status
    );
  }
}

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
