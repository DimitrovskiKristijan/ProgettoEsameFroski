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

    case "logout":
      require_once "server/logout.php";   
    break;

    default:
        header("location: client/Home/login.html");
     break;
}
?>