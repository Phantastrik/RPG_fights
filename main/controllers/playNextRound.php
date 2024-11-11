<?php
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/game/run.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/warrior.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/mage.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/personnages/monster.class.php');
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . '../../entity/game/eventStage.class.php');
session_start();


if (isset($_SESSION['player']) && isset($_SESSION['run']) ) {
    $_SESSION['run']->playStage();
}
// Exporter l'état de la Run en JSON
header('Content-Type: application/json');
echo json_encode($_SESSION['run']->arrayExport());