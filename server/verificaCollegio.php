<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    //$data = json_decode(file_get_contents("php://input"), true);
    $titolo = $_POST['titolo'];
    $data = $_POST['Data_Collegio'];
    $file = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : null;

    // Verifica se i dati JSON sono stati ricevuti correttamente
        if (isset($titolo) && isset($data)) {
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

        // Prepara la query SQL per selezionare il collegio con il titolo, la data e il file specificati
        $query = "SELECT * FROM collegi WHERE Titolo = ? AND Data_Collegio = ? AND File_CSV = ?";

        // Prepara la query SQL
        $stmt = $conn->prepare($query);

        // Associa i parametri alla query
        $stmt->bind_param("sss", $titolo, $data, $file);

        // Esegui la query SQL
        $stmt->execute();

        // Ottieni il risultato
        $ris = $stmt->get_result();

        // Verifica se la query ha prodotto dei risultati
        if ($ris) {
            // Prepara un oggetto JSON per la risposta
            $jObj = new stdClass();

            // Se ci sono risultati
            if ($ris->num_rows > 0) {
                // Prepara una risposta con codice 0 e descrizione "Collegio Trovato"
                $jObj = preparaRisp(0, "Collegio Trovato");
            } else {
                // Prepara una risposta con codice -1 e descrizione "Collegio Non Trovato"
                $jObj = preparaRisp(-1, "Collegio Non Trovato");
            }
        } else {
            // Prepara una risposta con codice -1 e descrizione "Errore nella query"
            $jObj = preparaRisp(-1, "Errore nella query: " . $conn->error);
        }

        // Chiudi la connessione al database
        $conn->close();

        // Restituisco la risposta in formato JSON
        echo json_encode($jObj);
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