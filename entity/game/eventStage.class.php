<?php

require_once __DIR__.'/../../config/autoload.php';

class EventStage extends Stage implements ArrayExportable{
    protected $name;
    protected $text;
    protected $effects = [];

    public function __construct(int $stageNumber, Personnage $player){
        parent::__construct($player,$stageNumber);
        $effect = Effect::createFromPreset();
        $this->name = $effect->getName();
        $this->text = "Evenement";
        array_push($this->effects,$effect);
    }

    // redefinition de execute
    public function execute(){
        foreach($this->effects as $effect){
            $this->player->applyEffect($effect);
        }
        $this->done = true;
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
        $res = parent::arrayExport();
        $effects_array = array();
        foreach($this->effects as $eff){
            array_push($effects_array,$eff->arrayExport());
        }
        $res["type"] = "event";
        $res["name"] = $this->name;
        $res["text"] = $this->text;
        $res["effects"] = $effects_array;
        return $res;
    }
}