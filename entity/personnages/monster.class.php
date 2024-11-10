<?php
require_once 'personnage.class.php';

class Monster extends Personnage
{
    protected static $namelist = [
        "Slime","Demon","Gobelin","Troll","Papillon"
    ];

    protected $statSpreadValue;

    public function __construct($name,int $baseLevel = 1){
       
        parent::__construct(self::$namelist[rand(0,count(self::$namelist)-1)]);
        if(!is_null($name)){
            $this->name = $name;            
        }
        $this->className = "Monster";
        array_push($this->abilities,new PhysicAttackAbility("Poc"));

        // clacul des stats
        $this->statSpreadValue = 0.2;
        $this->spreadStats();
       

        // init du niveau
        for($i=0;$i<$baseLevel;$i++){
            $this->gainExp($this->calculateExpToNextLevel());
        }
        $this->refresh();
    }

    // permet de randomizer un peu les stats
    public function spreadStats(){
        $rand = ((mt_rand() / mt_getrandmax() * $this->statSpreadValue) - $this->statSpreadValue);

        $this->pvMax = round($this->pvMax *(1+$rand));
        $this->pmMax = round($this->pmMax *(1+$rand));
        $this->attaque  = round($this->attaque  *(1+$rand));
        $this->defense = round($this->defense *(1+$rand));
        $this->sagesse = round($this->sagesse *(1+$rand));
        $this->vitesse = round($this->vitesse *(1+$rand));

        return $this;
    }
   
    public function __toString(){
        $res = <<<TEXT
    MONSTER  [{$this->name}]({$this->niveau}) - PV:{$this->pv}/PM:{$this->pm}
    <stats>: ATT:{$this->attaque}/DEF:{$this->defense}/SAG:{$this->sagesse}/VIT:{$this->vitesse}
TEXT
;
        return $res;
    }

}
