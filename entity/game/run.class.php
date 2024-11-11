<?php

require_once __DIR__.'/../../config/autoload.php';


class Run implements Executable, Observable, ArrayExportable {

    private $seed;
    private $stages = [];
    private $maxStagesNumber;
    private $player;
    private $observers = [];


    public function __construct(Personnage $player,$maxStagesNumber, $seed = null)
    {
        $this->maxStagesNumber = $maxStagesNumber;
        $this->seed = $seed ?? random_int(1, 1000000);  // Génère une seed si aucune n'est donnée
        $this->player = $player;
        mt_srand($this->seed);  // Initialiser le générateur avec la seed
        $this->generateStages();
    }

    public function generateStages(){
       for($i=1;$i<=$this->maxStagesNumber;$i++){
            array_push($this->stages,Stage::generateStage($this->player,$i));
        }
        return $this;
    }

    public function toHTML(){
        $res = '';
        foreach($this->stages as $stage){
            $res.=$stage->toHTML();
        }
        return $res;
    }

    public function playStage(){
        $played = false;
        foreach($this->stages as $s){
            if(!$played && !$s->isDone()){
                $s->execute();
                $played = true;
            }
        }

        $this->notify();
        return $this;
    }

    // IMPLEMENTS Executable
    public function execute(){
        foreach($this->stages as $stage){
            
            if(!$this->player->isDead()){
                $this->player->refresh();
                $stage->execute();
            }
            $this->notify();
        }
        return $this;
    }

    // IMPLEMENTS Observable
    public function subscribe($obs){
        array_push($this->observers, $obs);
        return $this;
    }
    // IMPLEMENTS Observable 
    public function notify(){
        foreach($this->observers as $obs){
            $obs->update($this->arrayExport());
        }
    }
    // IMPLEMENTS ArrayExportable
    public function arrayExport(){
        $playerData = $this->player->arrayExport();
        
        $stagesData = array();
        foreach($this->stages as $s){
            array_push($stagesData,$s->arrayExport());
        }

        $res = array(
            "player" => $playerData,
            "seed"   => $this->seed,
            "stages" => $stagesData,
            "maxStageNumber" => $this->maxStagesNumber,
        );

        return $res;
    }


}