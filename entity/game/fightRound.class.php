<?php
require_once __DIR__ . '/../../config/autoload.php';

class FightRound implements Observable, Executable, ArrayExportable
{

    // private $fight = null;
    private $observers = [];
    private $done = false;
    private $player = null;
    private $enemy = null;
    private $playerAbility = null;
    private $enemyAbility = null;

    private $exportData = [
        "done" => false,
        "playerFirst" => false,
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

    public function __construct($player, $enemy)
    {
        // $this->fight = $fight;
        // $this->subscribe($fight);
        $this->player = $player;
        $this->enemy = $enemy;
        $this->enemyAbility = $this->enemy->getAnAbility();
        $this->exportData["enemy"]["usedAbility"] = $this->enemyAbility->arrayExport();
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
        // $this->notification["done"] = $this->done;
        // foreach ($this->observers as $obs) {
        //     $obs->update($this->notification);
        // }
    }
    public function setChoosedAbility($ab)
    {
        $this->playerAbility = $ab;
        $this->exportData["playerAbility"] = $this->playerAbility;
        return $this;
    }

    public function resolveAbility(Ability $ab, String $who)
    {
        $caster = $who == "player" ? $this->player : $this->enemy;
        $receiver =  $who == "player" ? $this->enemy : $this->player;
        $receiver_type = $who == "player" ? "enemy" : "player";
        // degat sortants
        $output_damage = $caster->cast($ab);
        $this->exportData[$who]["usedAbility"] = $ab->getName();
        $this->exportData[$who]["damageDealt"] = $output_damage;

        // degat entrants
        $input_damage = $receiver->receiveDamage($output_damage);
        $this->exportData[$receiver_type]["damageReceived"] = $input_damage;

        // appliquer les effets
        if ($ab->canEffectTargetEnemy()) {
            $ab->applyEffectOn($receiver);
        }
        if ($ab->canEffectTargetPlayer()) {
            $ab->applyEffectOn($caster);
        }
    }
    public function endPhase(){
        $this->player->tickEffects();
        $this->enemy->tickEffects();
    }

    public function execute()
    {
        // var_dump("executing");
        $participants = array(
            "player" => $this->player,
            "enemy" => $this->enemy
        );
        // 1. Trier les participants par vitesse (ou autre critère d'initiative)
        uasort($participants, function ($a, $b) {
            return $b->getVitesse() - $a->getVitesse();
        });
        // 2. Phase d'Action
        $first_found = false;
        foreach ($participants as $key => $participant) {
            if (!$first_found) {
                $this->exportData["playerFirst"] = $key == "player";
                $first_found = true;
            }
            if (!$participant->isDead()) {
                // Déterminer l'bility choisie
                $ab = null;
                if ($key == "player") {
                    $ab = $this->playerAbility == null ? $participant->getAnAbility() : $this->player->getAbilities()[$this->playerAbility];
                } else {
                    // $ab = $this->enemyAbility == null ? $participant->getAnAbility() : $this->enemy->getAbilities()[$this->enemyAbility];
                    $ab = $this->enemyAbility;
                }

                // Résoudre l'action
                $this->resolveAbility($ab, $key);
            }
        }

        // phase de fin 
        $this->endPhase();

        // le tour est terminé
        $this->done = true;
        $this->exportData["done"] = $this->done;
        //$this->notify();
        return $this;
    }

    // ---IMPLEMENTS Executable

    public function arrayExport()
    {
        // var_dump($this->exportData);
        return $this->exportData;
    }
}
