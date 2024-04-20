<?php

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['parametro'])) {
    // Ricevi il parametro inviato dal client tramite la richiesta POST
    $parametro = $_POST['parametro'];

    $hostname = 'localhost';
    $username = 'root'; // Cambia con le tue credenziali
    $password = ''; 
    $database = 'collegiumpress';

    $con = new mysqli($hostname, $username, $password, $database);

    if ($con->connect_error) {
        die("Connessione al database fallita: " . $con->connect_error);
    }
   
    $query = "INSERT INTO collegi (nome_colonna) VALUES ('$parametro')";
    if ($con->query($query) === TRUE) {
        echo json_encode(array('success' => 'Nuova riga inserita con successo'));
    } else {
        echo json_encode(array('error' => 'Errore durante l\'inserimento: ' . $con->error));
    }

    $con->close();
} else {
    echo json_encode(array('error' => 'Parametro non ricevuto'));
}