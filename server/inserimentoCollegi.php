<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Leggi i dati da $_POST
    $titolo = $_POST['titolo'];
    $Data_Collegio = $_POST['Data_Collegio'];
    $Ora_Inizio = $_POST['Ora_Inizio'];
    $Ora_Fine = $_POST['Ora_Fine'];
  
    $collegioDate = DateTime::createFromFormat('Y-m-d', $Data_Collegio); 
    
    $collegioYear = $collegioDate->format('Y');
    $collegioMonth = $collegioDate->format('m');
    
    if ($collegioMonth > 6) {
        // Se siamo dopo giugno, l'anno scolastico è l'anno del collegio e l'anno successivo
        $nextYearDate = clone $collegioDate;
        $nextYearDate->modify('+1 year');
        $nextYear = $nextYearDate->format('Y');
        $Anno_Scolastico = "$collegioYear/$nextYear";
    } else {
        // Se siamo prima di luglio, l'anno scolastico è l'anno precedente e l'anno del collegio
        $previousYearDate = clone $collegioDate;
        $previousYearDate->modify('-1 year');
        $previousYear = $previousYearDate->format('Y');
        $Anno_Scolastico = "$previousYear/$collegioYear";
    }
    
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
    $username = 'root'; 
    $password = ''; 
    $database = 'collegiumpress';

    $con = new mysqli($hostname, $username, $password, $database);

    if ($con->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Connessione al database fallita']);
        return;
    }

    // Prepara la query SQL
    $query = "INSERT INTO collegi (Anno_Scolastico, Titolo, Ora_Inizio, Ora_Fine, Data_Collegio,File_CSV) VALUES (?, ?, ?, ?, ?,?)";
    $stmt = $con->prepare($query);
    
    // Associa i valori ai parametri della query
    $stmt->bind_param("ssssss", $Anno_Scolastico, $titolo, $Ora_Inizio, $Ora_Fine, $Data_Collegio,$File_CSV);

    // Esegui la query per inserire i dati del collegio
    if ($stmt->execute()) {
        $collegio_id = $stmt->insert_id; // Ottieni l'ID del collegio appena inserito
        $stmt->close();

// Apri il file CSV e leggi i dati
if ($File_CSV) {
    if (($handle = fopen($upload_file, "r")) !== FALSE) {
        // Salta l'intestazione, se presente
         fgetcsv($handle);
         fgetcsv($handle);

        // Prepara la query per inserire i dati dal CSV nella tabella presenze
        $query_csv = "INSERT INTO utenti (NomeCognome, Email, Ruolo, ID_Collegio) VALUES (?, ?,'docente esterno', ?)";
        $stmt_csv = $con->prepare($query_csv);

        // Leggi ogni riga del file CSV e inserisci i dati nel database
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            if (!isset($data[1])) {
                continue; 
            }
        
            // Associa i valori letti dal CSV ai parametri della query
            $NomeCognome = $data[1]; // Prendi solo la colonna "Cognome e nome"
            $Mail = ''; 
            
            $stmt_csv->bind_param("ssi", $NomeCognome, $Mail, $collegio_id);
            
            // Esegui la query
            if (!$stmt_csv->execute()) {
                echo json_encode(['status' => 'error', 'message' => $stmt_csv->error]);
                return;
            }
        }

        // Chiudi il file CSV
        fclose($handle);
        $stmt_csv->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Impossibile aprire il file CSV']);
        return;
    }
}

echo json_encode(['status' => 'success', 'message' => 'Collegio e dati inseriti correttamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error, 'details' => 'Errore durante l inserimento del collegio']);
}
// Chiudi la connessione al database
$con->close();
}
?>
