"use strict";
window.onload = async () => {
  console.log("Sei nel Reparto Amministratore!!");
  document.getElementById("btnLogout").addEventListener("click", logout);
};

async function inserisciCollegio() {
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

    // Leggi la risposta come testo
    let textResponse = await response.text();
    console.log("Server response:", textResponse);
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
}
