window.onload = async () => {
  /* INIZIALIZZA LA LIBRERIA */
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
