<?php

require_once __DIR__.'/../../config/autoload.php';

class Personnage implements Levelable, Caster, ArrayExportable
{

    protected static $namelist = ['Andre','Roto','Zoma', 'pilmout'];
	protected $name = null;
    protected $pvMax = null;
	protected $pv = null;
    protected $pmMax = null;
	protected $pm = null;
	protected $attaque  = null;
	protected $defense = null;
	protected $sagesse = null;
    protected $vitesse = null;
    protected $niveau = null;
    protected $className = null;
    protected $abilities = [];
    protected $activeEffects = [];
    protected $exp = 0;
    protected $baseExp = 0;

    public function __construct($name){
        if(is_null($name)){
            $this->name     = self::$namelist[rand(0,count(self::$namelist)-1)];
        }else{
            $this->name     = $name;
        }
        $this->pvMax    = 100;
        $this->pv       = $this->pvMax;
        $this->pmMax    = 100;
        $this->pm       = $this->pmMax;
        $this->attaque  = 10;
        $this->defense  = 10;
        $this->sagesse  = 10;
        $this->vitesse  = 10;
        $this->niveau   = 1;
        $this->exp      = 0;
        $this->baseExp  = 100;
        // array_push($this->abilities,new PhysicAttackAbility("Poc"));
    }

    // Getters and Setters

    public function getName()
    {
        return $this->name;
    }
    public function getPvMax()
    {
        return $this->pvMax;
    }
    public function getPv()
    {
        return $this->pv;
    }
    public function getPmMax()
    {
        return $this->pvMax;
    }
    public function getPm()
    {
        return $this->pm;
    }
    

    public function getAttaque()
    {
        return $this->attaque;
    }

    public function getDefense()
    {
        return $this->defense;
    }

    public function getSagesse()
    {
        return $this->sagesse;
    }

    public function getVitesse()
    {
        return $this->vitesse;
    }

    public function getNiveau()
    {
        return $this->niveau;
    }
    // Calculer l'XP pour le prochain niveau
    public function calculateExpToNextLevel()
    {
        return round($this->baseExp * pow($this->niveau, 1.5));
    }
    // Gagner de l'XP
    public function gainExp(int $amount)
    {
        $this->exp += $amount;

        // Vérifier si le joueur a assez d'XP pour passer au niveau suivant
        while ($this->exp >= $this->calculateExpToNextLevel()) {
            $this->levelUp();
        }
    }

    public function isDead(){
        return $this->pv <= 0;
    }

    public function getAnAbility(){
        $res = $this->abilities[rand(0,count($this->abilities)-1)];
        return $res;
    }

    public function getAbilities(){
        return $this->abilities;
    }
    //
    public function usePm(int $cost) :bool{
        $res = true;
        if($this->pm >= $cost){
            $this->pm -= $cost;
        }else{
            $res = false;
        }
        return $res;
    }    

    public function loosePV(int $damage){
        $this->pv -= $damage;
        if($this->pv < 0){
            $this->pv = 0;
        }
        return $this;
    }

    public function refresh(){
        $this->pv = $this->pvMax;
        $this->pm = $this->pmMax;
        return $this;
    }

    public function receiveDamage(int $damage) :self{
        $real_damage = $damage - $this->defense;
        return $this->loosePV($real_damage);
    }

    public function addAbility(Ability $ab){
        array_push($this->abilities,$ab);
        return $this;
    }

    public function applyEffect(Effect $e){
        //$mod = $e->getModifier();
        array_push($this->activeEffects, $e);
        return $this;
    }

    public function getModifiedStats(){
        $res= [
            "pvMax"    => $this->pvMax,
            "pv"       => $this->pv,
            "pmMax"    => $this->pmMax,
            "pm"       => $this->pm,
            "attaque"  => $this->attaque,
            "defense"  => $this->defense,
            "sagesse"  => $this->sagesse,
            "vitesse"  => $this->vitesse,
        ];
        foreach($this->activeEffects as $e){
            $res["pvMax"]      = $res["pvMax"]      + $e->getModifier()["pvMax_modifier"];
            $res["pv"]         = $res["pv"]         + $e->getModifier()["pv_modifier"];
            $res["pmMax"]      = $res["pmMax"]      + $e->getModifier()["pmMax_modifier"];
            $res["pm"]         = $res["pm"]         + $e->getModifier()["pm_modifier"];
            $res["attaque"]    = $res["attaque"]    + $e->getModifier()["attaque_modifier"];
            $res["defense"]    = $res["defense"]    + $e->getModifier()["defense_modifier"];
            $res["sagesse"]    = $res["sagesse"]    + $e->getModifier()["sagesse_modifier"];
            $res["vitesse"]    = $res["vitesse"]    + $e->getModifier()["vitesse_modifier"];
        }
        return $res;
    }

  


    // ---IMPLEMENTS Levelable
    public function levelUp()
    {
            // XP
        $this->exp -= $this->calculateExpToNextLevel();
        // stats
        $this->niveau++;
        $this->pvMax = round($this->pvMax * (1.1));
        $this->pmMax = round($this->pmMax * (1.1));
        $this->attaque += $this->niveau;
        $this->defense += $this->niveau;
        $this->sagesse += $this->niveau;
        $this->vitesse += $this->niveau;
    
       
        return $this;
    }

    // ---IMPLEMENTS Cast
    public function cast(Ability $ability){
        $damage = 0;
        // si assez de PM pour utilisr l'ability
        if($this->usePm($ability->getPmCost())){
            $damage = $ability->getBasicDamage()
            + $this->attaque * $ability->getAttaqueUse()
            + $this->defense * $ability->getDefenseUse()
            + $this->sagesse * $ability->getSagesseUse()
            + $this->vitesse * $ability->getVitesseUse();

        }
        $damage = $ability->applySpread($damage);
        return $damage;
    }

    public function __toString(){
        $res = <<<TEXT
    NOCLASS [{$this->name}]({$this->niveau}) - PV:{$this->pv}/PM:{$this->pm}
    <stats>: ATT:{$this->attaque}/DEF:{$this->defense}/SAG:{$this->sagesse}/VIT:{$this->vitesse}
TEXT
;
        return $res;
    }

    public function getStatTableContentHTML(){
        $res = <<<HTML
        <tr class="row">
            <td class="col-6">PV</td>
            <td class="col-6">{$this->pv}/{$this->pvMax}</td>
        </tr>
        <tr class="row">
            <td class="col-6">PM</td>
            <td class="col-6">{$this->pm}/{$this->pmMax}</td>
        </tr>
        <tr class="row">
            <td class="col-6">ATTAQUE</td>
            <td class="col-6">{$this->attaque}</td>
        </tr>
        <tr class="row">
            <td class="col-6">DEFENSE</td>
            <td class="col-6">{$this->defense}</td>
        </tr>
        <tr class="row">
            <td class="col-6">SAGESSE</td>
            <td class="col-6">{$this->sagesse}</td>
        </tr>
        
        <tr class="row">
            <td class="col-6">VITESSE</td>
            <td class="col-6">{$this->vitesse}</td>
        </tr>
HTML
        ;
        return $res;
    }

    public function toHTML(){
        $dir = 'http://localhost/RPG_Fights/assets';
        $stats = $this->getStatTableContentHTML();
        $abilities_HTML = '<ul class="list-group">';
        foreach($this->abilities as $ability){
            $abilities_HTML.= $ability->toHTML();
        }
        $abilities_HTML .= '</ul>';
        
        $res = <<<HTML
                    <div class="container bg-light" style="display:inline-block">
                        <div class="row lign-items-start">
                            <h5 class="col-6">
                                <img src="{$dir}/{$this->className}_icon.png" alt="{$this->className} icon">
                                <span class="badge text-bg-secondary">{$this->name}</span>
                                <span class="badge text-bg-dark">Lvl. {$this->niveau}</span>
                            </h5>  
                        </div>
                        <div class="row">
                            <div class="col-6" >
                                <table class="table">
                                    {$stats}      
                                </table>
                            </div>
                            <div class="col-6" >
                                {$abilities_HTML}
                            </div>
                        </div>
                    </div>
HTML
        ;
        return $res;
    }

    public function toTinyHTML(){
        $dir = 'http://localhost/RPG_Fights/assets';
        $res = <<<HTML
                
                        <div class="row">
                            <h5 class="col">
                                <img src="{$dir}/{$this->className}_icon.png" alt="{$this->className} icon">
                                <span class="badge text-bg-secondary">{$this->name}</span>
                            </h5>
                        </div>                              
                        <div class="row">
                            <span class="badge text-bg-dark col">Lvl. {$this->niveau}</span>
                        </div>
                        <div class="row">
                            <span class="badge text-bg-danger col">PV {$this->pv}/{$this->pvMax}</span>
                        </div>
                        <div class="row">
                            <span class="badge text-bg-info col">PM {$this->pm}/{$this->pmMax}</span>
                        </div>
                        <div class="row">
                            <span class="badge text-bg-warning col">EXP {$this->exp}/{$this->calculateExpToNextLevel()}</span>
                        </div>
                    
HTML
        ;
        return $res;
    }

    public function getModifiedStatsHTML(){
        $stats = $this->getModifiedStats();
        $res = '';

        foreach($stats as $key => $val){
            $col = $val < 0 ? 'danger' : 'success';
            $res.= <<<HTML
        <div class="row">
            <span class="badge text-bg-secondary col">$key : $val</span>
        </div>
HTML
;
        }
        return $res;
    }

    // Implements arrayExportable
    public function arrayExport(){
        $abs = array();
        foreach($this->abilities as $a){
            array_push($abs,$a->arrayExport());
        }
        $eff = array();
        foreach($this->activeEffects as $e){
            array_push($eff,$e->arrayExport());
        }
        $res = array(
            "name" => $this->name,
            "pvMax" => $this->pvMax,
            "pv" => $this->pv,
            "pmMax" => $this->pmMax,
            "pm" => $this->pm,
            "attaque"  => $this->attaque,
            "defense" => $this->defense,
            "sagesse" => $this->sagesse,
            "vitesse" => $this->vitesse,
            "niveau" => $this->niveau,
            "isDead" => $this->isDead(),
            "className" => $this->className,
            "exp" => $this->exp,
            "baseExp" => $this->baseExp,
            "abilities" => $abs,
            "activeEffects" => $eff,
            "modifiedStats" => $this->getModifiedStats()
        );
        return $res;
    }
}
