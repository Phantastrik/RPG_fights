<?php

require_once 'entity/personnages/personnage.class.php';
require_once 'entity/personnages/warrior.class.php';
require_once 'entity/personnages/mage.class.php';
require_once 'entity/personnages/rogue.class.php';
require_once 'entity/personnages/monster.class.php';
require_once 'entity/game/stage.class.php';
require_once 'entity/game/fight.class.php';
require_once 'entity/listener/fightListener.class.php';
require_once 'webpage.class.php';

$w = new WebPage();

$w->appendCssUrl('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
$w->setTitle("RPGFights");

$war = new Warrior("Wawazor");
$mag = new Mage("Zomajik");
$rog = new Rogue("Dissimulo");
$monster = new Monster("Gobbles",1);

$war->levelUp()->addAbility(new PhysicAttackAbility("Stab"));
$mag->levelUp()->levelUp()->levelUp()->addAbility(new MagicAttackAbility(null,15));


$stateBefore = <<<HTML
    <div class="col-6">
        <h1>Before Fight</h1>
        <div class="row">
            <div class="col-6">
                {$mag->toHTML()}
            </div>
        </div>  
    </div>    
HTML
;
$listener = new FightListener();
$listener->setFightResulOnly(false);

$monster = new Monster(null,1);
$i = 0;
while(! $mag->isDead()){
    ;
    $monster->levelUp();
    $monster->refresh();

    $fight = new Fight(1,$mag,$monster);
    $fight->subscribe($listener);
    $fight->execute();
    // $mag->refresh();
    $i++;
}

    $w->appendContent(<<<HTML
        <div class="row">
            {$stateBefore}
            <div class="col-6">
            <h1>After Fight</h1>    
                <div class="col-6">
                    {$mag->toHTML()}
                </div>
            </div>
        </div>
        <div class ="row">
            <div class="col">
                {$listener->toHTML()}
            </div>
        </div>
        
HTML
);



$w->appendContent(<<<HTML
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
HTML
);
echo($w->toHTML());

