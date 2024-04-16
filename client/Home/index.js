"use strict";

window.onload = async () => {
  /* INIZIALIZZA LA LIBRERIA PARTE GOOGLE */
  google.accounts.id.initialize({
    client_id:
      "603005178582-2k9tkuq4ag5lde21ta8o5bl36grdkfhn.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(document.getElementById("btnGoogle"), {
    theme: "outline",
    size: "large",
  });
  google.accounts.id.prompt();

  // Esempio di chiamata GET

  let risposta = await fetch("/index.php?action=init"); // metto il servizio che mi in teressa per contattare da client

  let testo = await risposta.json();
  console.log(testo);

  let risposta2 = await fetch("/index.php?action=getCollegi"); // metto il servizio che mi in teressa per contattare da client

  let testo2 = await risposta2.json();
  console.log(testo2);

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
};

function handleCredentialResponse(data) {
  console.log(parseJwt(data.credential));
  /*
  const { credential } = data;
  if (credential) {
    // Invia il token di autenticazione a PHP per il login
    const idToken = credential;
    loginWithGoogle(idToken);
  }
  */
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

/*

// Funzione per eseguire il login con Google
function loginWithGoogle(idToken) {
  // Invia il token di autenticazione a PHP tramite fetch o XMLHttpRequest
  const formData = new FormData();
  formData.append("id_token", idToken);

  fetch("login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Redirect alla dashboard dopo il login
        window.location.href = "dashboard.php";
      } else {
        console.error("Errore durante il login con Google");
      }
    })
    .catch((error) => {
      console.error("Errore di rete:", error);
    });
}
*/
