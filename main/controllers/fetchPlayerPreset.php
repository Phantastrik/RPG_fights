<?php
require_once __DIR__ . '/../../config/autoload.php';
$players_presets = Presets::getPreset_PLAYER(); 
$res = array();
foreach($players_presets as $key => $val){
    $res[$key] = $val->arrayExport();
}

// Exporter l'état de la Run en JSON
header('Content-Type: application/json');
echo json_encode($res);