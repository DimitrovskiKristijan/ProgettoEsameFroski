<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" ) {
    // Leggi i dati da $_POST
    $titolo = $_POST['titolo'];
    $Data_Collegio = $_POST['Data_Collegio'];
    $Ora_Inizio = $_POST['Ora_Inizio'];
    $Ora_Fine = $_POST['Ora_Fine'];

    // Controlla se è stato inviato un file
    if (isset($_FILES['file'])) {
        $upload_dir = 'Uploads/'; // Modifica con il percorso della tua directory di upload
        $File_CSV = basename($_FILES['file']['name']);
        $upload_file = $upload_dir . $File_CSV;

        // Sposta il file caricato nella directory di upload
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) {
            echo json_encode(['status' => 'error', 'message' => 'Impossibile spostare il file caricato']);
            return;
        }
    } else {
        $File_CSV = null;
    }
    // Connessione al database
    $hostname = 'localhost';
    $username = 'root'; // Cambia con le tue credenziali
    $password = ''; 
    $database = 'collegiumpress';

    $con = new mysqli($hostname, $username, $password, $database);

    if ($con->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Connessione al database fallita']);
        return;
    }

    // Imposta ora_inizio al momento attuale
    //$ora_inizio = date('Y-m-d H:i:s');

    // Prepara la query SQL
    $query = "INSERT INTO collegi (titolo, ora_Inizio, ora_Fine, File_CSV, Data_Collegio) VALUES (?, ?, ?, ?, ?)";
    $stmt = $con->prepare($query);

    // Associa i valori ai parametri della query
    $stmt->bind_param("sssss", $titolo, $Ora_Inizio, $Ora_Fine, $File_CSV, $Data_Collegio);

    // Esegui la query
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success, il collegio è stato inserito correttamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }

    // Chiudi la connessione
    $stmt->close();
    $con->close();
}