<?php
// Avvia la sessione
session_start();

// Registra l'ora del logout e l'utente che ha eseguito il logout
$_SESSION['logout_time'] = date('Y-m-d H:i:s');
$_SESSION['logout_user'] = $_SESSION['nome'];

echo $_SESSION['logout_time'];
echo $_SESSION['logout_user'];

// Cancella tutte le variabili di sessione
session_unset();

// Distruggi la sessione
session_destroy();

// Reindirizza l'utente alla pagina di login
header('Location: ../index.php');
exit;
?>