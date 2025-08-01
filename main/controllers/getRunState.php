<?php
require_once __DIR__ . '/../../config/autoload.php';
session_start();

// Initialiser une Run en session, si ce n’est pas déjà fait
if (!isset($_SESSION['player'])) {
    if (isset($_GET['class'])) {
        if ($_GET['class'] == "mage") {
            $_SESSION['player'] = Mage::createFromPreset();
        } else if ($_GET['class'] == "rogue") {
            $_SESSION['player'] = Rogue::createFromPreset();
        } else {
            $_SESSION['player'] = Warrior::createFromPreset();
        }
    } else {
        $_SESSION['player'] = Warrior::createFromPreset();
    }
}
// Initialiser une Run en session, si ce n’est pas déjà fait
if (!isset($_SESSION['run'])) {
    // echo("stting the session");    
    if (isset($_GET['seed'])) {
        $_SESSION['run'] = new Run($_SESSION['player'], rand(10, 15),$_GET['seed']);
    }else{
        $_SESSION['run'] = new Run($_SESSION['player'], rand(10, 15));
    }
    
   
}

$run = $_SESSION['run'];

// Exporter l'état de la Run en JSON
header('Content-Type: application/json');
echo json_encode($run->arrayExport());
