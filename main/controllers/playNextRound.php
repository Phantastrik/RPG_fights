<?php
require_once __DIR__ . '/../../config/autoload.php';
session_start();


if (isset($_SESSION['player']) && isset($_SESSION['run']) ) {
    $_SESSION['run']->playStage();
}
// Exporter l'état de la Run en JSON
header('Content-Type: application/json');
echo json_encode($_SESSION['run']->arrayExport());