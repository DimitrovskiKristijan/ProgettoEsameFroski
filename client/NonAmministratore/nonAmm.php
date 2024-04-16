<?php
// Avvia la sessione PHP
session_start();

// Verifica se l'utente ha effettuato il logout
if (isset($_POST['logout'])) {
    // Distruzione della sessione
    session_unset(); // Cancella tutte le variabili di sessione
    session_destroy(); // Distrugge la sessione

    // Reindirizzamento alla pagina di login
    header('Location: login.html');
    exit(); // Interrompe l'esecuzione dello script dopo il reindirizzamento
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <script src="Bootstrap/jquery.js"></script>
  <script src="Bootstrap/bootstrap.js"></script>
  <script src="https://accounts.google.com/gsi/client"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <link rel="stylesheet" href="Bootstrap/bootstrap.css">
  <link rel="stylesheet" href="nonAmm.css">
  <script src="nonAmm.js"></script>

  <title>COLLEGIUMPRESS</title>
</head>
<body>

<!-- NavBar-->
<nav class="navbar navbar-light bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="../img/Screenshot 2024-03-14 100215.png" alt="" width="70" height="70" class="d-inline-block align-text-top">
            HOME
        </a>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <button type="submit"> <span class="material-symbols-outlined">
            logout
            </span></button> <!-- Form per il logout -->
        </form>
    </div>
</nav>

<!-- Contenuto della pagina per il non amministratore -->
<div class="container">
    <div class="header">
        <img src="../img/Immagini_coordinate_VALLAURI4.png" alt="Inserisci un'immagine" class="IMG">
        <h1 class="title">COLLEGIUMPRESS - Area Riservata Non Amministratore</h1>
    </div>
    <br><br>
    <div class="row">
        <div class="col">
            <h1 class="txtCont">Benvenuto, <?php echo $_SESSION['nome']; ?>!</h1>
            <!-- Contenuto personalizzato per l'utente non amministratore -->
        </div>
    </div>
</div>

</body>
</html>