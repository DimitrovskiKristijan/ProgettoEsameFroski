<?php
 $metodo = $_GET["action"];
 switch($metodo){

    case "init":
        $obj = new stdClass(); //per creare un oggetto in JSON
        $obj -> desc = "salve Mondo";
        echo json_encode($obj);
    break;

    case "getCollegi":
      require_once "server/collegio.php";
    break;

    case "inserisciCollegi":
      require_once "server/inserimentoCollegi.php";
    break;

    case "controlloUtente":
      require_once "server/controlloUtente.php";   
    break;

    case "aggiungiUtente":
      require_once "server/aggiungiUtente.php";   
    break;

    case "login":
      require_once "server/login.php";   
    break;

    case "logout":
      require_once "server/logout.php";   
    break;

    default:
        header("location: client/Home/login.html");
     break;
}
?>