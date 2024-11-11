<?php
require_once __DIR__.'/../../config/autoload.php';

class Rogue extends Personnage
{

    public function __construct($name){
        parent::__construct($name);
        $this->className = "rogue";
        
        array_push($this->abilities,new AttackAbility("Stab"));
    }

    public function levelUp()
    {
        $this->niveau++;
        $this->pvMax = ceil($this->pvMax * (1.15));
        $this->attaque += ($this->niveau +1);
        $this->defense += (1);
        $this->sagesse += (1);
        $this->vitesse += ($this->niveau+1);
        return $this;
    }
    
    public function __toString(){
        $res = <<<TEXT
    ROGUE [{$this->name}]({$this->niveau}) - PV:{$this->pv}/PM:{$this->pm}
    <stats>: ATT:{$this->attaque}/DEF:{$this->defense}/SAG:{$this->sagesse}
TEXT
;
        return $res;
    }

  
}
