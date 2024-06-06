<?php
$hostname = 'localhost';
$username = 'root'; //chiedi come fare ad avere il tuo
$password = '';
$database = 'collegiumpress';

// Connessione al database
$con = new mysqli($hostname, $username, $password, $database);

// Verifica se c'è stato un errore nella connessione
if ($con->connect_error) {
    die("Connessione al database fallita: " . $con->connect_error);
}

// Decodifica i dati JSON inviati dal client
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se l'email è stata inviata
if (isset($data['email'])) {
    $email = $data['email'];

    // Prepara la query SQL
    $stmt = $con->prepare("SELECT ID_Collegio FROM utenti WHERE Email = ?");
    $stmt->bind_param("s", $email);

    // Esegui la query
    $stmt->execute();

    // Ottieni i risultati
    $result = $stmt->get_result();
    $utente = $result->fetch_assoc();

    // Invia l'ID_Collegio al client
    echo json_encode(['ID_Collegio' => $utente['ID_Collegio']]);
} else {
    // Se l'email non è stata inviata, restituisci un messaggio di errore
    echo json_encode(['error' => 'Email non fornita']);
}

// Chiudi la connessione al database
$con->close();