<?php
require_once __DIR__.'/../../config/autoload.php';

class PhysicAttackAbility extends AttackAbility
{

    protected static $namelist = ['BING','Ploum','Zbaf', 'Et Flan!'];
	

    public function __construct($name){
        parent::__construct(
            is_null($name) ? 
                self::$namelist[rand(0,count(self::$namelist)-1)] : 
                $name
        );
        $this->attaque_use = 0.8;
        $this->defense_use = 0.2;
        $this->sagesse_use = 0;
        $this->flavor = "Attaque physique";
    }
    public static function createFromPreset() : self{
        return Presets::getPreset_ABILITIES()["physic"][array_rand(Presets::getPreset_ABILITIES()["physic"])];
    }
  

    public function __toString(){
        $res = <<<TEXT
    ATTAQUE PHYSIQUE[{$this->name}]-
    <stats>: DAMAGE:{$this->basic_damage}/ADS use:{$this->attaque_use}/{$this->defense_use}/{$this->sagesse_use}
TEXT
;
        return $res;
    }

}
