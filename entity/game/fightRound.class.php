<?php
require_once __DIR__ . '/../../config/autoload.php';

class FightRound implements Observable, Executable, ArrayExportable
{

    private $fight = null;
    private $observers = [];
    private $done = false;
    private $choosedAbility = null;
    private $enemyAbility = null;
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
    private $exportData = [
        "done" => false,
        "payerFirst" => false,
        "player" => array(
            "usedAbility" => null,
            "damageDealt" => 0,
            "damageReceived" => 0,
        ),
        "enemy" => array(
            "usedAbility" => null,
            "damageDealt" => 0,
            "damageReceived" => 0,
        )
    ];

    public function __construct($fight)
    {
        $this->fight = $fight;
        $this->subscribe($fight);
        $this->enemyAbility = $this->fight->getFighterB()->getAnAbility();
        $this->exportData["enemy"]["usedAbility"] = $this->enemyAbility;
    }


    // ---IMPLEMENTS Observable
    public function subscribe($observer)
    {
        array_push($this->observers, $observer);
        return $this;
    }
    // ---IMPLEMENTS Observable
    public function notify()
    {
        // mise a jour de la notif envoyée
        $this->notification["done"] = $this->done;
        foreach ($this->observers as $obs) {
            $obs->update($this->notification);
        }
    }
    public function setChoosedAbility($ab)
    {
        $this->choosedAbility = $ab;
        $this->exportData["choosedAbility"] = $this->choosedAbility;
        return $this;
    }

    // ---IMPLEMENTS Executable
    public function execute()
    {
        $fightOrder = array(
            0 => null,
            1 => null
        );
        // on determine le premier attaquant
        if ($this->fight->getPlayer()->getVitesse() > $this->fight->getPlayer()->getVitesse()) {
            $playerFirst = true;
            $this->exportData["playerFirst"] = $playerFirst;

            $fightOrder[0] = $this->fight->getPlayer();
            $fightOrder[1] = $this->fight->getFighterB();
        } else {
            $playerFirst = false;
            $fightOrder[0] = $this->fight->getFighterB();
            $fightOrder[1] = $this->fight->getPlayer();
        }
        $this->notification["fighter0"]["name"] = $fightOrder[0]->getName();
        $this->notification["fighter1"]["name"] = $fightOrder[1]->getName();

        // l'attaquant choisi une ability
        if ($playerFirst) {
            if ($this->choosedAbility != null) { // capacité deja selectionnée
                $ab = $fightOrder[0]->getAbilities()[$this->choosedAbility];
            } else {
                $ab = $fightOrder[0]->getAnAbility();
            }
        } else { // l'enemy attaque first
            if ($this->enemyAbility != null) { // capacité preselectionnée
                $ab = $this->enemyAbility;
            } else {
                $ab = $fightOrder[0]->getAnAbility();
            }
        }
        $this->exportData[$playerFirst ? "player" : "enemy"]["usedAbility"] = $ab->arrayExport();

        $this->notification["fighter0"]["usedAbility"] = $ab->getName();
        // on récupère les degats du cast
        $dmg_dealt = $fightOrder[0]->cast($ab);
        $this->notification["fighter0"]["damageDealt"] = $dmg_dealt;
        $this->exportData[$playerFirst ? "player" : "enemy"]["damagedDealt"] = $dmg_dealt;

        // on applique les dégats au defenseur
        $pvLoss = $fightOrder[1]->getPv();
        $fightOrder[1]->receiveDamage($dmg_dealt);
        // cas spécial pour un spell
        if (get_class($ab) == 'Spell') {
            if ($ab->canTargetPlayer()) {
                $ab->applyOn($playerFirst ? $fightOrder[0] : $fightOrder[1]);
            }
            if ($ab->canTargetEnemy()) {
                $ab->applyOn($fightOrder[0]);
                $ab->applyOn($playerFirst ? $fightOrder[1] : $fightOrder[0]);
            }
        }
        $pvLoss -= $fightOrder[1]->getPv();
        $this->notification["fighter1"]["damageReceived"] = $pvLoss;
        $this->exportData[$playerFirst ? "enemy" : "player"]["damageReceived"] = $pvLoss;

        if (!$fightOrder[1]->isDead()) {
            // si il est pas mort
            // l'attaquant choisi une ability
            if (!$playerFirst && $this->choosedAbility != null) {
                $ab = $fightOrder[1]->getAbilities()[$this->choosedAbility];
            } else {
                $ab = $fightOrder[1]->getAnAbility();
            }

            // l'attaquant choisi une ability
            if (!$playerFirst) {
                if ($this->choosedAbility != null) { // capacité deja selectionnée
                    $ab = $fightOrder[1]->getAbilities()[$this->choosedAbility];
                } else {
                    $ab = $fightOrder[1]->getAnAbility();
                }
            } else { // l'enemy attaque
                if ($this->enemyAbility != null) { // capacité preselectionnée
                    $ab = $this->enemyAbility;
                } else {
                    $ab = $fightOrder[1]->getAnAbility();
                }
            }

            $this->exportData[$playerFirst ? "enemy" : "player"]["usedAbility"] = $ab->arrayExport();
            $this->notification["fighter1"]["usedAbility"] = $ab->getName();
            // on récupère les degats du cast
            $dmg_dealt = $fightOrder[1]->cast($ab);
            $this->notification["fighter1"]["damageDealt"] = $dmg_dealt;
            $this->exportData[$playerFirst ?  "enemy" : "player"]["damagedDealt"] = $dmg_dealt;
            // on applique les dégats au defenseur
            $pvLoss = $fightOrder[0]->getPv();
            $fightOrder[0]->receiveDamage($dmg_dealt);
            // cas spécial pour un spell
            if (get_class($ab) == 'SpellAbility') {
                if ($ab->canTargetPlayer()) {
                    $ab->applyOn($playerFirst ? $fightOrder[1] : $fightOrder[0]);
                }
                if ($ab->canTargetEnemy()) {
                    $ab->applyOn($playerFirst ? $fightOrder[0] : $fightOrder[1]);
    
                }
            }
            $pvLoss -= $fightOrder[0]->getPv();
            $this->notification["fighter0"]["damageReceived"] = $pvLoss;
            $this->exportData[$playerFirst ? "player" : "enemy"]["damageReceived"] = $pvLoss;
        }
        // le tour est terminé
        $this->done = true;
        $this->exportData["done"] = $this->done;
        $this->notify();
        return $this;
    }
    public function arrayExport()
    {
        return $this->exportData;
    }
}
