<?php
/*
session_start();

// Verifica se l'utente è autenticato
if (!isset($_SESSION['ruolo'])) {
    // Se l'utente non è autenticato, reindirizza alla pagina di login
    header('Location: index.php');
    exit(); // Interrompe l'esecuzione dello script
}

// Verifica il ruolo dell'utente per consentire l'accesso alla pagina
$ruolo = $_SESSION['ruolo'];

// Puoi eseguire ulteriori controlli in base al ruolo, se necessario
if ($ruolo !== 'amministratore') {
    // Reindirizza a una pagina di accesso negato se l'utente non ha il ruolo richiesto
    header('Location: accesso-negato.php');
    exit();
}

// Il resto della pagina HTML per il docente...
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benvenuto amministratore</title>
</head>
<body>
    <h1>Benvenuto Amministratore!</h1>
    <!-- Contenuto della pagina per il docente -->
</body>
</html>
*/

// Inizia la sessione
session_start();

// Distrugge tutte le variabili di sessione
$_SESSION = array();

// Se desideri distruggere completamente la sessione, cancella anche il cookie di sessione.
// Nota: ciò distruggerà la sessione e non solo i dati della sessione!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Infine, distrugge la sessione
session_destroy();

// Reindirizza l'utente alla pagina di login
header("Location: login.html");
exit;
?>
