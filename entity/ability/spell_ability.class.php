<?php
require_once __DIR__.'/../../config/autoload.php';

class SpellAbility extends Ability
{

    protected static $namelist = ['Buuf','Debuff'];
    protected $effect;
    protected $target_player;
    protected $target_enemy;
    public function __construct($name,$effect,$pmCost = 0){
        parent::__construct(
            is_null($name) ? 
                self::$namelist[rand(0,count(self::$namelist)-1)] : 
                $name
        );
        $this->pm_cost      = 0;
        $this->basic_damage = 0;
        $this->attaque_use  = 0;
        $this->defense_use  = 0;
        $this->sagesse_use  = 0;
        $this->vitesse_use = 0;
        $this->spread = 0;
        $this->target_enemy = true;
        $this->target_player = false;

        $this->effect = $effect;
        $this->flavor = "spell";
    }
    public function canTargetEnemy(){
        return $this->target_enemy;
    }
    public function setTargetEnemy(bool $val){
        $this->target_enemy = $val;
        return $this;
    }
    public function canTargetPlayer(){
        return $this->target_player;
    }
    public function setTargetPlayer(bool $val){
        $this->target_player = $val;
        return $this;
    }
    public function applyOn(Personnage $personnage){
        $personnage->applyEffect($this->effect);
        return $this;
    }
    public function getEffect(){
        return $this->effect;
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
