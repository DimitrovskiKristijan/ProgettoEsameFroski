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

        // Verifica se l'email contiene "@vallauri.edu"
    if (strpos($email, '@vallauri.edu') === false) {
        // L'email non contiene "@vallauri.edu", quindi aggiungi l'utente al database
        $stmt = $conn->prepare("INSERT INTO utenti (nome, cognome, email, ruolo) VALUES (?, ?, ?, ?)");
        $ruolo = 'docente esterno';
        $stmt->bind_param("ssss", $nome, $cognome, $email, $ruolo);
        $stmt->execute();

        // Verifica se l'utente è stato aggiunto con successo
        if ($conn->affected_rows > 0) {
            // L'utente è stato aggiunto con successo, quindi prepara una risposta di successo
            $jObj = preparaRisp(0, "Utente aggiunto con successo");
        } else {
            // C'è stato un errore nell'aggiunta dell'utente, quindi prepara una risposta di errore
            $jObj = preparaRisp(-1, "Errore nell'aggiunta dell'utente");
        }
    }

        // Prepara la query SQL per selezionare il ruolo dell'utente con il nome e il cognome specificati
        $query = "SELECT ruolo FROM utenti WHERE nome = '$nome' AND cognome = '$cognome'";

        // Esegui la query SQL
        $ris = $conn->query($query);

        // Verifica se la query ha prodotto dei risultati
        if ($ris) {
            // Prepara un oggetto JSON per la risposta
            $jObj = new stdClass();

            // Se ci sono risultati
            if ($ris->num_rows > 0) {
                // Prepara un array per memorizzare i ruoli
                $jObj->livello = array();

                // Estrai i ruoli e aggiungili all'array
                while ($vet = $ris->fetch_assoc()) {
                    array_push($jObj->livello, $vet["ruolo"]);
                }
            }
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