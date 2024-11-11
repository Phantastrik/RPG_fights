<?php

require_once 'entity/personnages/personnage.class.php';
require_once 'entity/personnages/warrior.class.php';
require_once 'entity/personnages/mage.class.php';
require_once 'entity/personnages/rogue.class.php';
require_once 'entity/personnages/monster.class.php';
require_once 'entity/game/run.class.php';
require_once 'entity/game/stage.class.php';
require_once 'entity/game/eventStage.class.php';
require_once 'entity/game/fight.class.php';
require_once 'entity/listener/fightListener.class.php';
require_once 'entity/listener/runListener.class.php';
require_once 'webpage.class.php';

$w = new WebPage();

$w->appendCssUrl('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
$w->setTitle("runTester");

$player = new Rogue("Roguo");
$player->addAbility(new PhysicAttackAbility("swoosh"));

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

