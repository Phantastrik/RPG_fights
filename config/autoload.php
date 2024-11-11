<?php

// --Interfaces
require_once __DIR__.'\..\entity\interfaces\arrayExportable.interface.php';
require_once __DIR__.'\..\entity\interfaces\caster.interface.php';
require_once __DIR__.'\..\entity\interfaces\executable.interface.php';
require_once __DIR__.'\..\entity\interfaces\levelable.interface.php';
require_once __DIR__.'\..\entity\interfaces\observable.interface.php';
require_once __DIR__.'\..\entity\interfaces\observer.interface.php';

// -- entities 
// abilities
require_once __DIR__.'\..\entity\ability\ability.class.php';
require_once __DIR__.'\..\entity\ability\attack_ability.class.php';
require_once __DIR__.'\..\entity\ability\magic_attack_ability.class.php';
require_once __DIR__.'\..\entity\ability\physic_attack_ability.class.php';
require_once __DIR__.'\..\entity\ability\spell_ability.class.php';

// effects
require_once __DIR__.'\..\entity\effects\effects.class.php';

// game
require_once __DIR__.'\..\entity\game\stage.class.php';
require_once __DIR__.'\..\entity\game\eventStage.class.php';
require_once __DIR__.'\..\entity\game\fight.class.php';
require_once __DIR__.'\..\entity\game\fightRound.class.php';
require_once __DIR__.'\..\entity\game\run.class.php';

// personnages
require_once __DIR__.'\..\entity\personnages\personnage.class.php';
require_once __DIR__.'\..\entity\personnages\warrior.class.php';
require_once __DIR__.'\..\entity\personnages\rogue.class.php';
require_once __DIR__.'\..\entity\personnages\mage.class.php';
require_once __DIR__.'\..\entity\personnages\monster.class.php';


// listeners
require_once __DIR__.'\..\entity\listener\fightListener.class.php';
require_once __DIR__.'\..\entity\listener\runListener.class.php';

// webpage
require_once __DIR__.'\..\webpage\webpage.class.php';

// presets
require_once __DIR__.'/presets.php';




