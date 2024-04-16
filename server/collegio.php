<?php
$hostname = 'localhost';
$username = 'root'; //chiedi come fare ad avere il tuo
$password = '';
$database = 'collegiumPres';

// Connessione al database
$con = new mysqli($hostname, $username, $password, $database);

// Verifica se c'è stato un errore nella connessione
if ($con->connect_error) {
    die("Connessione al database fallita: " . $con->connect_error);
}

// Query per selezionare tutti i dati dalla tabella collegio
$query = "SELECT * FROM collegio";
$result = $con->query($query);

// Verifica se la query ha prodotto dei risultati
if ($result->num_rows > 0) {
    // Crea un array per memorizzare i risultati della query
    $risultati = array();

    // Itera sui risultati della query
    while($row = $result->fetch_assoc()) {
        // Aggiungi ogni riga ai risultati
        $risultati[] = $row;
    }

    // Converti i risultati in formato JSON
    $risultati_json = json_encode($risultati);

    // Invia i dati JSON al client
    echo $risultati_json;
} else {
    // Se la query non ha prodotto risultati, restituisci un messaggio vuoto
    echo json_encode(array());
}

// Chiudi la connessione al database
$con->close();