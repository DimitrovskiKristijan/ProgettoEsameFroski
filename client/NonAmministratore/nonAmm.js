"use strict";
window.onload = async () => {
  //INIZIALIZZO VARIABILI
  document.getElementById("btnLogout").addEventListener("click", logout);

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

    // Leggi la risposta come testo
    let textResponse = await response.text();
    console.log("Server response:", textResponse);
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
}
