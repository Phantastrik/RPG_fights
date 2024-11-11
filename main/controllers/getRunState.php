<?php
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/game/run.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/warrior.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/mage.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/monster.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/game/eventStage.class.php');
session_start();

// Initialiser une Run en session, si ce n’est pas déjà fait
if (!isset($_SESSION['player'])) {
    $_SESSION['player'] = new Warrior("Wawazor");
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