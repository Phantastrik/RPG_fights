<?php

require_once __DIR__.'/config/autoload.php';

$w = new WebPage("runTester");

$w->appendCssUrl('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');


$player = Presets::getPreset_PLAYER()[array_rand(Presets::getPreset_PLAYER())];


$run = new Run($player,15);
$listener = new RunListener();
$run->subscribe($listener);
$run->notify();
//$run->playStage();


/*
$before_run = $run->toHTML();
$after_run = $run->execute()->toHTML(); 
$w->appendContent(<<<HTML
    <div class="row">
        <div class = "col-6">
            {$before_run}
        </div>
        <div class = "col-6">
            {$after_run}
        </div>
    </div>
HTML
);
*/

$w->appendContent(<<<HTML
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
HTML
);
echo($w->toHTML());

