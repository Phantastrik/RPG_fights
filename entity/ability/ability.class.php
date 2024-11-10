<?php

class Ability
{

    protected static $namelist = ['Pif','Bam','Frizz', 'Zoub'];
	protected $name = null;
	protected $pm_cost = null;
	protected $basic_damage = null;
	protected $attaque_use  = null;
	protected $defense_use = null;
	protected $sagesse_use = null;
    protected $vitesse_use = null;
    protected $spread = 0;
    protected $flavor = null;

    public function __construct($name){
        if(is_null($name)){
            $this->name     = self::$namelist[rand(0,count(self::$namelist)-1)];
        }else{
            $this->name     = $name;
        }
        $this->pm_cost      = 0;
        $this->basic_damage = 10;
        $this->attaque_use  = 1;
        $this->defense_use  = 0;
        $this->sagesse_use  = 0;
        $this->vitesse_use = 0;
        $this->spread = 0.2;
        $this->flavor = "vanilla";
    }
   // Getters

    public function getName()
    {
        return $this->name;
    }

    public function getPmCost()
    {
        return $this->pm_cost;
    }

    public function getBasicDamage()
    {
        return $this->basic_damage;
    }

    public function getAttaqueUse()
    {
        return $this->attaque_use;
    }

    public function getDefenseUse()
    {
        return $this->defense_use;
    }

    public function getSagesseUse()
    {
        return $this->sagesse_use;
    }
    public function getVitesseUse()
    {
        return $this->sagesse_use;
    }
    public function getSpread(){
        return $this->spread;
    }

    // 
    public function applySpread($damage){
        $rand = ((mt_rand() / mt_getrandmax() * $this->spread) - $this->spread);
        return round($damage * (1 + +$rand)); 
    }

    public function __toString(){
        $res = <<<TEXT
    ABILITY [{$this->name}]-
    <stats>: DAMAGE:{$this->basic_damage}/ADSV use:{$this->attaque_use}/{$this->defense_use}/{$this->sagesse_use}/{$this->vitesse_use}
TEXT
;
        return $res;
    }

    public function toHTML(){
        $bootstrap_pill = 'primary';
        switch($this->flavor){
            case "Attaque":
                $bootstrap_pill = "danger";
                break;
            case "Attaque magique":
                $bootstrap_pill = "info  text-dark";
                break;
            case "Attaque physique":
                $bootstrap_pill = "warning text-dark";
                break;
            case "Spell":
                $bootstrap_pill = "success";
                break;
        }
        return <<<HTML
        <li class="list-group-item d-flex justify-content-between align-items-start" s>
            <div class="ms-2 me-auto fs-6">
                <div class="fw-bold">{$this->name} <span class="badge text-bg-{$bootstrap_pill}">{$this->flavor}</span></div>
                <!--p>DAMAGE:{$this->basic_damage}/ADSV use:{$this->attaque_use}/{$this->defense_use}/{$this->sagesse_use}/{$this->vitesse_use}</p-->
            </div>
            
        </li>
HTML
        ;
    }

}
