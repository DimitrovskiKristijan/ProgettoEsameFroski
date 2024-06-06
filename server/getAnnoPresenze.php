<?php
// Parametri di connessione al database
$hostname = 'localhost';
$username = 'root'; 
$password = ''; 
$database = 'collegiumpress';

// Connessione al database
$conn = new mysqli($hostname, $username, $password, $database);

// Verifica se c'è stato un errore nella connessione al database
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Prepara la query SQL per ottenere tutti gli anni scolastici unici
$stmt = $conn->prepare("SELECT DISTINCT Anno_Scolastico FROM presenze");

// Esegui la query
$stmt->execute();

// Ottieni i risultati
$result = $stmt->get_result();

// Prepara la risposta
$risposta = preparaRisp(0, "Dati ottenuti con successo", $result->fetch_all(MYSQLI_ASSOC));

// Invia la risposta
echo json_encode($risposta);

// Funzione per preparare una risposta JSON standardizzata
function preparaRisp($cod, $desc, $data = null) {
    $risposta = new stdClass();
    $risposta->cod = $cod;
    $risposta->desc = $desc;
    $risposta->data = $data;
    return $risposta;
}
?>