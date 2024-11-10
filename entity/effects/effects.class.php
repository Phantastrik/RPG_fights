<?php

class Effect
{
    private $name;
    private $duration;
    private $modifier = [
        "name_modifier" => 0,
        "pvMax_modifier" => 0,
        "pv_modifier" => 0,
        "pmMax_modifier" => 0,
        "pm_modifier" => 0,
        "attaque_modifier"  => 0,
        "defense_modifier" => 0,
        "sagesse_modifier" => 0,
        "vitesse_modifier" => 0,
        "niveau_modifier" => 0,
        "className_modifier" => 0,
        "abilities_modifier" => 0,
        "exp_modifier" => 0,
        "baseExp_modifier" => 0  
    ];  // Effet appliqué (par exemple, +10 en attaque)

    public function __construct($name, $duration)
    {
        $this->name = $name;
        $this->duration = $duration;
    }

    public static function createRandomEffect($spread=0.3){
        $res =  new Effect("Random Effect",1);
        $key = array_rand($res->getModifier());
        $rand = ((mt_rand() / mt_getrandmax() * $spread) - $spread);
        $val = (round($res->getModifier()[$key] * (1 + +$rand)));
        $res->setModifierKey($key,$val);
        return $res;
    }

    // Réduit la durée de l'effet et vérifie s'il est expiré
    public function tick()
    {
        $this->duration--;
        return $this->duration > 0;
    }

    public function getModifier()
    {
        return $this->modifier;
    }
    public function setModifierKey($key,$val){
        $this->modifier[$key] = $val;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function toHTML(){
        $res = <<<HTML
             <div class="row">
                <h5 class="col">
                    <span class="badge text-bg-secondary">{$this->name}</span>
                    <span class="badge text-bg-secondary">dur:{$this->duration}</span>
                </h5>
            </div>                              
HTML
;
            foreach($this->modifier as $key => $val){
                $mod_color = $val < 0 ? "danger" : "success";
                if($val != 0){
                    $res.= <<<HTML
                    <div class="row">
                        <span class="badge text-bg-{$mod_color} col">{$key} : {$val}</span>
                    </div>
        HTML
        ;
                }

            }
    }
}
