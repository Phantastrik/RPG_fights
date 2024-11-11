<?php

require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../personnages/personnage.class.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/executable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/observable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/arrayExportable.interface.php');
require_once('stage.class.php');

class Run implements Executable, Observable, ArrayExportable {

    private $seed;
    private $stages = [];
    private $maxStagesNumber;
    private $player;
    private $observers = [];


    public function __construct(Personnage $player,$maxStagesNumber = 10, $seed = null)
    {
        $this->maxStagesNumber = $maxStagesNumber;
        $this->seed = $seed ?? random_int(1, 1000000);  // Génère une seed si aucune n'est donnée
        $this->player = $player;
        mt_srand($this->seed);  // Initialiser le générateur avec la seed
        $this->generateStages();
    }

    public function generateStages(){
        for($i=0;$i<$this->maxStagesNumber;$i++){
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
        $undone_stages = array_filter($this->stages, function($stg){
            return !($stg->isDone());
        });
        if(count($undone_stages) == 0){
            // $this->done = true;
        }else{
            $undone_stages[0]->execute();
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