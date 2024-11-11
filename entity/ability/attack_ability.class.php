<?php
require_once __DIR__.'/../../config/autoload.php';

class AttackAbility extends Ability
{

    protected static $namelist = ['Hit','Smash','Paf', 'Dans ta gueule'];
	

    public function __construct($name){
        parent::__construct(
            is_null($name) ? 
                self::$namelist[rand(0,count(self::$namelist)-1)] : 
                $name
        );
        $this->flavor = "Attaque";
        $this->vitesse_use = 0.5;
    }
  

    public function __toString(){
        $res = <<<TEXT
    ATTAQUE [{$this->name}]-
    <stats>: DAMAGE:{$this->basic_damage}/ADS use:{$this->attaque_use}/{$this->defense_use}/{$this->sagesse_use}
TEXT
;
        return $res;
    }

}
