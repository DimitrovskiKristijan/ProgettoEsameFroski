<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se i dati JSON sono stati ricevuti correttamente
    if ($data !== null && isset($data['titolo']) && isset($data['dataCollegio'])) {
        // Estrai il nome e il cognome dall'oggetto $data
        $titolo = $data['titolo'];
        $dataCollegio = $data['dataCollegio'];
        $oraFine = $data['oraFine'];
        $oraInizio = $data['oraInizio'];


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
        
        // Prepara la query SQL per cercare un record nel database con i valori ricevuti dal client
        $query = "SELECT id FROM nome_tabella WHERE titolo = ? AND dataCollegio = ? AND oraInizio = ? AND oraFine = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $titolo, $dataCollegio, $oraInizio, $oraFine);

        // Esegui la query SQL
        $stmt->execute();

        // Ottieni il risultato della query
        $result = $stmt->get_result();

        // Controlla se è stato trovato un record corrispondente
        if ($result->num_rows > 0) {
            // Se è stato trovato un record corrispondente, esegui l'aggiornamento

//DA MODIFICARE

            $query_update = "UPDATE nome_tabella SET oraFine = ? WHERE titolo = ? AND dataCollegio = ? AND oraInizio = ?";
            $stmt_update = $conn->prepare($query_update);
            $stmt_update->bind_param("ssss", $oraFine, $titolo, $dataCollegio, $oraInizio);
            $stmt_update->execute();

            // Controlla se l'aggiornamento è stato eseguito con successo
            if ($stmt_update->affected_rows > 0) {
                // Aggiornamento eseguito con successo
                $response = array('success' => true, 'message' => 'Dati aggiornati con successo');
            } else {
                // Nessuna riga è stata modificata, quindi potrebbe non esserci corrispondenza o i dati potrebbero essere gli stessi
                $response = array('success' => true, 'message' => 'Nessuna modifica effettuata');
            }
        } else {
            // Se non è stato trovato un record corrispondente, potresti decidere di inserire un nuovo record
            // In alternativa, puoi restituire un messaggio di errore o gestire diversamente questa situazione
            $response = array('success' => false, 'message' => 'Record non trovato nel database');
        }

        // Chiudi le query preparate
        $stmt->close();
        $stmt_update->close();

        // Restituisci la risposta in formato JSON
        echo json_encode($response);
   
    } else {
        // Se i dati JSON non sono stati ricevuti correttamente, restituisco un messaggio di errore
        echo json_encode(array('error' => 'Dati mancanti o non validi'));
    }
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




////PARTE DA AGGIUNGERE

