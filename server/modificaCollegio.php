<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Estrai i dati JSON dall'oggetto POST
    $data = json_decode($_POST['objDati'], true);

    if (isset($data) && isset($data['titolo']) && isset($data['dataCollegio'])) {
        // Estrai i dati dall'oggetto $data
        $titolo = $data['titolo'];
        $dataCollegio = $data['dataCollegio'];
        $oraFine = $data['oraFine'];
        $oraInizio = $data['oraInizio'];
        $titoloModificato = $data['titoloModificato'];
        $oraInizioModificato = $data['oraInizioModificato'];
        $oraFineModificato = $data['oraFineModificato'];
        $DataModificato = $data['DataModificato'];

        // Parametri di connessione al database
        $hostname = 'localhost';
        $username = 'root'; 
        $password = ''; 
        $database = 'collegiumpress';

        $conn = new mysqli($hostname, $username, $password, $database);

        if ($conn->connect_error) {
            die("Connessione al database fallita: " . $conn->connect_error);
        }

        // Prepara la query SQL per cercare un record nel database con i valori ricevuti dal client
        $query = "SELECT ID_Collegio FROM collegi WHERE Titolo = ? AND Data_Collegio = ? AND Ora_Inizio = ? AND Ora_Fine = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssss", $titolo, $dataCollegio, $oraInizio, $oraFine);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $idCollegio = $row['ID_Collegio'];

            // Prepara la query SQL per l'aggiornamento del record nel database
            $query_update = "UPDATE collegi SET Titolo = ?, Data_Collegio = ?, Ora_Inizio = ?, Ora_Fine = ? WHERE ID_Collegio = ?";
            $stmt_update = $conn->prepare($query_update);
            $stmt_update->bind_param("ssssi", $titoloModificato, $DataModificato, $oraInizioModificato, $oraFineModificato, $idCollegio);
            $stmt_update->execute();

            if ($stmt_update->affected_rows > 0) {
                $response = array('success' => true, 'message' => 'Dati aggiornati con successo');
            } else {
                $response = array('success' => true, 'message' => 'Nessuna modifica effettuata');
            }

            if (isset($_FILES["FileModificato"]) && $_FILES["FileModificato"]["error"] == 0) {
                $fileName = $_FILES["FileModificato"]["name"];
                $fileTmpPath = $_FILES["FileModificato"]["tmp_name"];
                $uploadDir = "./uploaded_files/";

                // Verifica se la directory esiste, altrimenti creala
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                $destPath = $uploadDir . $fileName;

                if (move_uploaded_file($fileTmpPath, $destPath)) {
                    // Aggiorna il campo File_CSV nella tabella collegi
                    $query_update_file = "UPDATE collegi SET File_CSV = ? WHERE ID_Collegio = ?";
                    $stmt_update_file = $conn->prepare($query_update_file);
                    $stmt_update_file->bind_param("si", $fileName, $idCollegio);
                    $stmt_update_file->execute();
                    $stmt_update_file->close();

                    // Leggi il contenuto del file CSV e aggiorna la tabella utenti
                    $fileContent = file_get_contents($destPath);
                    $lines = explode("\n", $fileContent);

                    foreach ($lines as $line) {
                        $fields = str_getcsv($line);
                        if (count($fields) < 2) {
                            continue;
                        }
                        $nome = $fields[0];
                        $email = $fields[1];

                        // Prepara la query SQL per l'aggiornamento del record nella tabella utenti
                        $query_update_utenti = "UPDATE utenti SET email = ? WHERE nome = ?";
                        $stmt_update_utenti = $conn->prepare($query_update_utenti);
                        $stmt_update_utenti->bind_param("ss", $email, $nome);
                        $stmt_update_utenti->execute();
                        $stmt_update_utenti->close();
                    }
                } else {
                    $response = array('success' => false, 'message' => 'Errore nel caricamento del file');
                }
            }

            $stmt->close();
            $stmt_update->close();
        } else {
            $response = array('success' => false, 'message' => 'Record non trovato nel database');
        }

        echo json_encode($response);
    } else {
        echo json_encode(array('error' => 'Dati mancanti o non validi'));
    }
} else {
    echo json_encode(array('error' => 'Metodo di richiesta non consentito'));
}

function preparaRisp($cod, $desc, $jObj = null) {
    if (is_null($jObj)) {
        $jObj = new stdClass();
    }
    $jObj->cod = $cod;
    $jObj->desc = $desc;
   return $jObj;
}

