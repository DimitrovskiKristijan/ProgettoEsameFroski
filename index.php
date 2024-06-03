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

    case "getDocenti":
      require_once "server/getDocenti.php";
    break;

    case "inserimentoCollegi":
      require_once "server/inserimentoCollegi.php";
    break;

    case "controlloUtente":
      require_once "server/controlloUtente.php";   
    break;

    case "aggiungiUtente":
      require_once "server/aggiungiUtente.php";   
    break;

    case "registraPresenza":
      require_once "server/registraPresenza.php";   
    break;

    case "ottieniStorico":
      require_once "server/ottieniStorico.php";   
    break;
    
    case "verificaCollegio":
      require_once "server/verificaCollegio.php";   
    break;

    case "modificaCollegio":
      require_once "server/modificaCollegio.php";   
    break;
    
    case "getAnno":
      require_once "server/getAnno.php";
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