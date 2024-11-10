<?php
require_once 'personnage.class.php';
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../ability/physic_attack_ability.class.php');


class Warrior extends Personnage
{

    public function __construct($name){
        parent::__construct($name);
        $this->className = "warrior";
        
        array_push($this->abilities,new PhysicAttackAbility("Klong"));
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
