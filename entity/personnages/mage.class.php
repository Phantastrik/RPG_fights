<?php
require_once __DIR__.'/../../config/autoload.php';

class Mage extends Personnage
{

    public function __construct($name){
        parent::__construct($name);
        $this->className = "mage";
        array_push($this->abilities,new MagicAttackAbility("Bang",15));
    }

    public function levelUp()
    {
        $this->niveau++;
        $this->pvMax = ceil($this->pvMax * (1.05));
        $this->pmMax = ceil($this->pmMax * (1.15));
        $this->attaque += (1);
        $this->defense += (1);
        $this->sagesse += ($this->niveau +2);
        $this->vitesse += ($this->niveau);
        
        return $this;
    }
    
    public function __toString(){
        $res = <<<TEXT
    MAGE  [{$this->name}]({$this->niveau}) - PV:{$this->pv}/PM:{$this->pm}
    <stats>: ATT:{$this->attaque}/DEF:{$this->defense}/SAG:{$this->sagesse}/VIT:{$this->vitesse}
TEXT
;
        return $res;
    }


}
