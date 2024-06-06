<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Decodifica il JSON ricevuto
  $data = json_decode(file_get_contents('php://input'), true);

  if (!isset($data['idCollegio'])) {
      echo json_encode(array('error' => 'idCollegio non fornito'));
      exit;
  }

  $idCollegio = $data['idCollegio'];

    // Parametri di connessione al database
    $hostname = 'localhost';
    $username = 'root'; // Cambia con le tue credenziali
    $password = ''; 
    $database = 'collegiumpress';

    // Connessione al database
    $conn = new mysqli($hostname, $username, $password, $database);

    // Verifica se c'è stato un errore nella connessione al database
    if ($conn->connect_error) {
        die("Connessione al database fallita: " . $conn->connect_error);
    }

    // Prepara la query SQL per selezionare le presenze del collegio corretto
    $query = "SELECT utenti.NomeCognome, collegi.Titolo, collegi.ID_Collegio
              FROM presenze
              INNER JOIN utenti ON presenze.ID_Utente = utenti.ID_Utente
              INNER JOIN collegi ON presenze.ID_Collegio = collegi.ID_Collegio
              WHERE collegi.ID_Collegio = ?";

    // Prepara la query SQL
    $stmt = $conn->prepare($query);

    // Associa i parametri alla query
    $stmt->bind_param("i", $idCollegio);

    // Esegui la query SQL
    $stmt->execute();

    // Ottieni il risultato
    $ris = $stmt->get_result();

    // Verifica se la query ha prodotto dei risultati
    if ($ris) {
        // Prepara un array per le presenze
        $presenze = array();

        // Se ci sono risultati
        if ($ris->num_rows > 0) {
            // Aggiungi ogni presenza all'array delle presenze
            while ($presenza = $ris->fetch_assoc()) {
                $presenze[] = $presenza;
            }
        }

        // Restituisco le presenze in formato JSON
        echo json_encode($presenze);
    } else {
        // Prepara una risposta con codice -1 e descrizione "Errore nella query"
        $jObj = preparaRisp(-1, "Errore nella query: " . $conn->error);
        echo json_encode($jObj);
    }

    // Chiudi la connessione al database
    $conn->close();
} else {
    // Se la richiesta non è una richiesta POST, restituisco un messaggio di errore
    echo json_encode(array('error' => 'Metodo di richiesta non consentito'));
}

// Funzione per preparare una risposta JSON standardizzata
function preparaRisp($cod, $desc, $jObj = null) {
    if (is_null($jObj)) {
        $jObj = new stdClass();
    }
    $jObj->cod = $cod;
    $jObj->desc = $desc;
    return $jObj;
}
?>