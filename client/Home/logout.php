<?php
// Avvia la sessione
session_start();

// Cancella tutte le variabili di sessione
session_unset();

// Distruggi la sessione
session_destroy();

// Reindirizza l'utente alla pagina di login
header('Location: login.html');
exit;
?>