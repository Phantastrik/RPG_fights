<?php
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/executable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/arrayExportable.interface.php');
class Stage implements Executable, ArrayExportable {

    protected $stageNumber = 0;
    protected $player;
    protected bool $done = false;

    public function __construct(Personnage $player, $stageNumber){
        $this->stageNumber = $stageNumber;
        $this->player = $player;
    }

    public function execute(){
        return $this;
    }
    public static function generateStage(Personnage $fighterA,$stageNumber){
        if($stageNumber %3 == 2){
            $res = new EventStage($stageNumber,$fighterA); 
        }else{
            $res = Fight::createFromStageNumber($fighterA,$stageNumber); 
        }
         
        return $res;
    }

    public function toHTML(){
        $res = <<<HTML
    <div class="list-group-item">Stage n°{$this->stageNumber}</div>
HTML
;   
        return $res;
    }
    public function getStageNumber(){
        return $this->stageNumber;
    }

    public function isDone(){
        return $this->done;
    }

    // IMPLEMENT ArrayExportable
    public function arrayExport(){
        $res = array(
          "stageNumber" => $this->stageNumber,
          "done" => $this->done
        );
        return $res;
    }
    
}