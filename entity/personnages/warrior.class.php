<?php
require_once __DIR__.'/../../config/autoload.php';


class Warrior extends Personnage
{

    public function __construct($name){
        parent::__construct($name);
        $this->className = "warrior";
        
        // array_push($this->abilities,new PhysicAttackAbility("Klong"));
    }

    public static function createFromPreset() :Warrior{
        return Presets::getPreset_PLAYER()["warrior"];
    }

    public function levelUp()
    {
        $this->niveau++;
        $this->pvMax = ceil($this->pvMax * (1.15));
        $this->attaque += ($this->niveau +1);
        $this->defense += ($this->niveau +1);
        $this->sagesse += (1);
        $this->vitesse += (1);
        return $this;
    }
    
    public function __toString(){
        $res = <<<TEXT
    WARRIOR [{$this->name}]({$this->niveau}) - PV:{$this->pv}/PM:{$this->pm}
    <stats>: ATT:{$this->attaque}/DEF:{$this->defense}/SAG:{$this->sagesse}
TEXT
;
        return $res;
    }


}
