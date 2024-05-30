<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se i dati JSON sono stati ricevuti correttamente
    if ($data !== null && isset($data['email'])) {
        // Estrai l'email dall'oggetto $data
        $email = $data['email'];

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

        // Prepara la query SQL per ottenere l'ID dell'utente con l'email specificata
        $stmt = $conn->prepare("SELECT ID_Utente FROM Utenti WHERE Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
 
        if ($user) {
             $stmt = $conn->prepare("SELECT collegi.Data_Collegio, presenze.DataOra_Registrazione, collegi.Anno_Scolastico FROM presenze INNER JOIN collegi ON presenze.ID_Collegio = collegi.ID_Collegio WHERE presenze.ID_Utente = ?");
            $stmt->bind_param("i", $user['ID_Utente']);
            $stmt->execute();
            $result = $stmt->get_result();

            // Crea un array per contenere lo storico delle presenze
            $storico = array();

            // Loop attraverso i risultati
            while ($row = $result->fetch_assoc()) {
                // Aggiungi ogni riga allo storico
                $storico[] = $row;
            }

            // Invia lo storico come JSON
            header('Content-Type: application/json');
            echo json_encode($storico);
        } else {
            // L'utente non esiste
            $jObj = preparaRisp(-1, "Utente non trovato");
            // Invia la risposta al client
            header('Content-Type: application/json');
            echo json_encode($jObj);
        }
    }
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