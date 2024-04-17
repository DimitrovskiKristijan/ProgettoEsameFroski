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

  //INIZIALIZZO VARIABILI

  // Esempio di chiamata GET

  let risposta = await fetch("/index.php?action=init"); // metto il servizio che mi in teressa per contattare da client

  let testo = await risposta.json();
  console.log(testo);

  let risposta2 = await fetch("/index.php?action=getCollegi"); // metto il servizio che mi in teressa per contattare da client

  let testo2 = await risposta2.json();
  console.log(testo2);
};

async function handleCredentialResponse(data) {
  console.log(parseJwt(data.credential));

  let datiDaGoogle = parseJwt(data.credential);

  let nome = datiDaGoogle.family_name;
  let cognome = datiDaGoogle.given_name;
  let email = datiDaGoogle.email;

  // Output dei dati
  console.log("Nome:", nome);
  console.log("Cognome:", cognome);
  console.log("Email:", email);

  let objDati = {
    nome: nome,
    cognome: cognome,
    mail: email,
  };

  console.log(objDati);

  let opzioni = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specifica che il corpo della richiesta è in formato JSON
    },
    body: JSON.stringify(objDati), // Trasforma i dati in formato JSON per il corpo della richiesta
  };

  // Effettua la chiamata POST
  let risposta3 = await fetch("/index.php?action=controlloUtente", opzioni);

  let testo3 = await risposta3.json();
  console.log(testo3);

  // Verifica il ruolo dell'utente dalla risposta JSON
  if (testo3.livello) {
    let ruoli = testo3.livello; // Array dei ruoli dell'utente

    // Effettua il reindirizzamento in base ai ruoli
    for (let ruolo of ruoli) {
      switch (ruolo) {
        case "amministratore":
          window.location.href = "../Amministratore/index.html";
          console.log("sei un amministratore");
          return;
        case "docente":
          window.location.href = "../NonAmministratore/nonAmm.html";
          console.log("sei un docente");
          return;
        case "non amministratore":
          window.location.href = "../NonAmministratore/nonAmm.html";
          console.log("sei un non amministratore");
          return;
        default:
          // Ruolo non riconosciuto, gestisci di conseguenza
          console.error("Ruolo non riconosciuto:", ruolo);
          break;
      }
    }
  } else {
    console.error("Ruolo non presente nella risposta JSON");
  }
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
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
*/
