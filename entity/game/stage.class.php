<?php
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/executable.interface.php');

class Stage implements Executable {

    protected $stageNumber = 0;
    protected $player;

    public function __construct(Personnage $player, $stageNumber){
        $this->stageNumber = $stageNumber;
        $this->player = $player;
    }

    public function execute(){
        return $this;
    }
    public static function generateStage(Personnage $fighterA,$stageNumber){
        return Fight::createFromStageNumber($fighterA,$stageNumber);
    }

    public function toHTML(){
        $res = <<<HTML
    <div class="list-group-item">Stage n°{$this->stageNumber}</div>
HTML
;   
    return $res;
    }
    
}