<?php

require_once('fight.class.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/observable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/executable.interface.php');

class FightRound implements Observable, Executable{

    private $fight = null;
    private $observers = [];
    private $done = false;
    private $notification = array(
        "done"  => false,
        "fighter0" => array(
            "name" => null,
            "usedAbility" => null,
            "damageDealt" => 0,
            "damageReceived" => 0,
        ),
        "fighter1" => array(
            "name" => null,
            "usedAbility" => null,
            "damageDealt" => 0,
            "damageReceived" => 0,
        )
    );

    public function __construct($fight){
        $this->fight = $fight;
        $this->subscribe($fight);
    }


    // ---IMPLEMENTS Observable
    public function subscribe($observer){
        array_push($this->observers,$observer);
        return $this;
    }
    // ---IMPLEMENTS Observable
    public function notify(){
        // mise a jour de la notif envoyée
        $this->notification["done"] = $this->done;
        foreach($this->observers as $obs){
            $obs->update($this->notification);
        }
    }
    // ---IMPLEMENTS Executable
    public function execute(){
        $fightOrder = array(
            0 => null,
            1 => null
        );
        // on determine le premier attaquant
        if($this->fight->getFighterA()->getVitesse() > $this->fight->getFighterB()->getVitesse()){
            $fightOrder[0] = $this->fight->getFighterA();
            $fightOrder[1] = $this->fight->getFighterB();
        }else{
            $fightOrder[0] = $this->fight->getFighterB();
            $fightOrder[1] = $this->fight->getFighterA();
        } 
        $this->notification["fighter0"]["name"] = $fightOrder[0]->getName(); 
        $this->notification["fighter1"]["name"] = $fightOrder[1]->getName();

        // l'attaquant choisi une ability
        $ab = $fightOrder[0]->getAnAbility();
        $this->notification["fighter0"]["usedAbility"] = $ab->getName(); 
        // on récupère les degats du cast
        $dmg_dealt = $fightOrder[0]->cast($ab);
        $this->notification["fighter0"]["damageDealt"] = $dmg_dealt;
        
        // on applique les dégats au defenseur
        $pvLoss = $fightOrder[1]->getPv();
        $fightOrder[1]->receiveDamage($dmg_dealt);
        $pvLoss -= $fightOrder[1]->getPv();
        $this->notification["fighter1"]["damageReceived"] = $pvLoss;

        if( !$fightOrder[1]->isDead()){
            // si il est pas mort
            // l'attaquant choisi une ability
            $ab = $fightOrder[1]->getAnAbility();
            $this->notification["fighter1"]["usedAbility"] = $ab->getName(); 
            // on récupère les degats du cast
            $dmg_dealt = $fightOrder[1]->cast($ab);
            $this->notification["fighter1"]["damageDealt"] = $dmg_dealt;
            
            // on applique les dégats au defenseur
            $pvLoss = $fightOrder[0]->getPv();
            $fightOrder[0]->receiveDamage($dmg_dealt);
            $pvLoss -= $fightOrder[0]->getPv();
            $this->notification["fighter0"]["damageReceived"] = $pvLoss;
        }
        // le tour est terminé
        $this->done =true;
        $this->notify();
        return $this;

        
    }

}
