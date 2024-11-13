<?php
require_once __DIR__ . '/../../config/autoload.php';
session_start();

// Initialiser une Run en session, si ce n’est pas déjà fait
if (!isset($_SESSION['player'])) {
    $_SESSION['player'] = Warrior::createFromPreset();
}
// Initialiser une Run en session, si ce n’est pas déjà fait
if (!isset($_SESSION['run'])) {
   // echo("stting the session");    
    $_SESSION['run'] = new Run($_SESSION['player'],rand(10,15));
}

$run = $_SESSION['run'];

// Exporter l'état de la Run en JSON
header('Content-Type: application/json');
echo json_encode($run->arrayExport());