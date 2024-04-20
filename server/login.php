<?php
session_start(); // Avvia la sessione
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ricezione dei dati inviati dal client tramite una richiesta POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se i dati JSON sono stati ricevuti correttamente
    if ($data !== null && isset($data['nome']) && isset($data['email'])) {
        // Estrai il nome e l'email dall'oggetto $data
        $nome = $data['nome'];
        $email = $data['email'];

        // Imposta le variabili di sessione
        $_SESSION['user'] = $nome;
        $_SESSION['email'] = $email;
        $_SESSION['login_time'] = date('Y-m-d H:i:s'); // Registra l'ora di accesso

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
            // Invia una risposta al client per indicare che il login è stato effettuato con successo con un'email non istituzionale
            echo json_encode(['success' => 'Login effettuato con successo con un\'email non istituzionale']);
        } else {
            // Invia una risposta al client per indicare che il login è stato effettuato con successo con un'email istituzionale
            echo json_encode(['success' => 'Login effettuato con successo con un\'email istituzionale']);
        }
        // Invia l'ora di accesso al client
        echo $_SESSION['login_time'];
    } else {
        // Se i dati non sono validi o mancanti, invia un messaggio di errore al client
        echo json_encode(['error' => 'Dati mancanti o non validi']);
    }
} else {
    // Se la richiesta non è una richiesta POST, restituisco un messaggio di errore
    echo json_encode(['error' => 'Metodo di richiesta non consentito']);
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