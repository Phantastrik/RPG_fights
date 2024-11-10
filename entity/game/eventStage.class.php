<?php

require_once __DIR__ . '/stage.class.php';
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\effects\effects.class.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\interface\arrayExportable.interface.php');


class EventStage extends Stage implements ArrayExportable{
    protected $name;
    protected $text;
    protected $effects = [];
    protected $player;

    public function __construct(int $stageNumber, Personnage $player){
        $this->name = "Evenement";
        $this->text = "Il se passe quelque chose là, non ?";
        array_push($this->effects,Effect::createRandomEffect($stageNumber/10));
        $this->player = $player;
    }

    // redefinition de execute
    public function execute(){
        foreach($this->effects as $effect){
            $this->player->applyEffect($effect);
        }
    }

    public function toHTML(){
        $effects_html = '';
       // var_dump($this->effects);
       // echo('<br>');
        foreach($this->effects as $e){
            $effects_html.= $e->toHTML();
        }

        $res = <<<HTML
        <div class="col">
            <div class="row">
                <div class="col">
                    <span class="fs-2 text-center">Stage {$this->stageNumber}</span>
                </div>
                <div class="col">
                    {$this->player->toTinyHTML()}
                </div>
                <div class="col">
                    <span class="fs-2 text-center">EFFECT</span>
                </div>
                <div class="col">
                    {$effects_html}
                </div>
                <div class="col">
                    {$this->player->getModifiedStatsHTML()}
                </div>
                <hr>
            </div>
        </div>
HTML
;   
        return $res;
    }    
    public function arrayExport(){
        
        $effects_array = array();
        foreach($this->effects as $eff){
            array_push($effects_array,$eff->arrayExport());
        }
        array(
            "name" => $this->name,
            "text" => $this->text,
            "effects" => $effects_array
        );

    }
}