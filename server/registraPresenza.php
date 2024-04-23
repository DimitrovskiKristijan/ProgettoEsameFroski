<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se i dati JSON sono stati ricevuti correttamente
    if ($data !== null && isset($data['nome']) && isset($data['cognome']) && isset($data['email'])) {
        // Estrai il nome, il cognome e l'email dall'oggetto $data
        $nome = $data['nome'];
        $cognome = $data['cognome'];
        $email = $data['email'];

        // Ottieni la data corrente
        $dataCorrente = date('Y-m-d');

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

        // Prepara la query SQL per ottenere l'ID dell'utente con il nome, cognome ed email specificati
        $stmt = $conn->prepare("SELECT ID_Utente FROM Utenti WHERE Nome = ? AND Cognome = ? AND Email = ?");
        $stmt->bind_param("sss", $nome, $cognome, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            // L'utente esiste, quindi verifica se ha già firmato oggi
            $stmt = $conn->prepare("SELECT * FROM Presenze WHERE ID_Utente = ? AND DATE(DataOra_Registrazione) = ?");
            $stmt->bind_param("is", $user['ID_Utente'], $dataCorrente);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // L'utente ha già firmato oggi, quindi invia un messaggio di errore
                die("Hai già firmato per oggi");
            } else {
                // L'utente non ha ancora firmato oggi, quindi registra la sua presenza
                $stmt = $conn->prepare("INSERT INTO Presenze (ID_Utente, ID_Collegio) VALUES (?, ?)");
                $id_collegio = 8; // Sostituisci con l'ID del collegio corretto
                $stmt->bind_param("ii", $user['ID_Utente'], $id_collegio);
                $stmt->execute();
                if ($conn->affected_rows > 0) {
                    // La presenza è stata registrata con successo
                    $jObj = preparaRisp(0, "Presenza registrata con successo");
                } else {
                    // C'è stato un errore nella registrazione della presenza
                    $jObj = preparaRisp(-1, "Errore nella registrazione della presenza");
                }
                // Invia la risposta al client
                header('Content-Type: application/json');
                echo json_encode($jObj);
            }
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