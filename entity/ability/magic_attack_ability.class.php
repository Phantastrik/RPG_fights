<?php
require_once __DIR__.'/../../config/autoload.php';

class MagicAttackAbility extends AttackAbility
{

    protected static $namelist = ['Woosh','Bang','Storm', 'Badaboom'];
	

    public function __construct($name,$pm_cost =0){
        parent::__construct(
            is_null($name) ? 
                self::$namelist[rand(0,count(self::$namelist)-1)] : 
                $name
        );
        $this->pm_cost = is_null($pm_cost) ? 10 : $pm_cost;
        $this->attaque_use = 0;
        $this->defense_use = 0;
        $this->sagesse_use = 1;
        $this->vitesse_use = 0.25;
        $this->flavor = "Attaque magique";
    }
    public static function createFromPreset() : self{
        return Presets::getPreset_ABILITIES()["magic"][array_rand(Presets::getPreset_ABILITIES()["magic"])];
    }

    public function __toString(){
        $res = <<<TEXT
    ATTAQUE MAGIQUE[{$this->name}]-
    <stats>: DAMAGE:{$this->basic_damage}/ADS use:{$this->attaque_use}/{$this->defense_use}/{$this->sagesse_use}
TEXT
;
        return $res;
    }

}
