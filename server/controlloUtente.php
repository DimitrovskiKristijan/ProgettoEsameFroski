<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se i dati JSON sono stati ricevuti correttamente
    if ($data !== null && isset($data['nome']) && isset($data['cognome'])) {
        // Estrai il nome e il cognome dall'oggetto $data
        $nome = $data['nome'];
        $cognome = $data['cognome'];

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
  
                  // Determina la pagina da reindirizzare in base al ruolo
                  
                  
                    if (in_array("amministratore", $jObj->livello)) {
                        $jObj->redirect = "client/Amministratore/index.html";
                    } else if (in_array("docente", $jObj->livello)) {
                        $jObj->redirect = "client/NonAmministratore/nonAmm.html";    
                    }
                 else if (in_array("non amministratore", $jObj->livello)) {
                    $jObj->redirect = "client/NonAmministratore/nonAmm.html";    
                }
                    
                // Prepara una risposta con codice 0 e descrizione "Utente Trovato"
                $jObj = preparaRisp(0, "Utente Trovato", $jObj);
            } else {
                // Prepara una risposta con codice -1 e descrizione "Utente Non Trovato"
                $jObj = preparaRisp(-1, "Utente Non Trovato");
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

