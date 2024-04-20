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

  // CHAMATA PER INIZIALIZZARE IL SISTEMA
  let risposta = await fetch("/index.php?action=init"); // metto il servizio che mi in teressa per contattare da client

  let testo = await risposta.json();
  console.log(testo);

  // CHIAMATA PER OTTENERE I COLLEGI
  let risposta2 = await fetch("/index.php?action=getCollegi"); // metto il servizio che mi in teressa per contattare da client

  let testo2 = await risposta2.json();
  console.log(testo2);
};

// Funzione per gestire la risposta del pulsante Google
async function handleCredentialResponse(data) {
  console.log(parseJwt(data.credential));

  let datiDaGoogle = parseJwt(data.credential);

  // Estrai i dati dall'oggetto
  let nome = datiDaGoogle.family_name;
  let cognome = datiDaGoogle.given_name;
  let email = datiDaGoogle.email;
  let id = datiDaGoogle.sub;

  // Output dei dati
  console.log("Nome:", nome);
  console.log("Cognome:", cognome);
  console.log("Email:", email);
  console.log("ID:", id);

  // Dopo aver ottenuto i dati, salvali nel localStorage
  localStorage.setItem("nome", nome);
  localStorage.setItem("cognome", cognome);
  localStorage.setItem("email", email);
  localStorage.setItem("id", id);

  //CHIAMATA PER CREARE LA SESSIONE e verificare il login
  let response = await fetch("/index.php?action=login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
    }),
  });

  //verifico se la sessione è stata creata
  if (response.ok) {
    console.log("Session created");
    console.log("Token:", data.credential);
  } else {
    console.log("Failed to create session");
  }

  // Oggetto con i dati da inviare al server
  let objDati = {
    nome: nome,
    cognome: cognome,
    mail: email,
    id: datiDaGoogle.sub,
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
        case "docente esterno":
          window.location.href = "../NonAmministratore/nonAmm.html";
          console.log("sei un docente esterno");
          return;
        case "non amministratore":
          window.location.href = "../NonAmministratore/nonAmm.html";
          console.log("sei un non amministratore");
          return;
        default:
          console.error("Nessun ruolo corrispondente trovato");
          break;
      }
    }
  } else {
    alert("Non fai parte di questo  Dominio, riprova la procedura di login!");
    console.error("Ruolo non presente nella risposta JSON");
  }

  //CHIAMATA PER AGGIUNTA UTENTE NEL DB (email non istituzionale)
  let response2 = await fetch("/index.php?action=aggiungiUtente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      cognome: cognome,
      email: email,
    }),
  });
  let utente = await response2.json();
  console.log(utente);
  if (utente.ok) {
    console.log("Utente aggiunto");
  } else {
    console.log("Utente non aggiunto");
  }
}

// Funzione per decodificare il token JWT
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
