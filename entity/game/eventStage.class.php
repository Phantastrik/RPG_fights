<?php

require_once('stage.class.php');

class EventStage  extends Stage {
    protected $name;
    protected $text;
    protected $effects = [];
    protected $player;

    public function __construct(int $stageNumber, Personnage $player){
        $this->name = "Evenement";
        $this->text = "Il se passe quelque chose là, non ?";
        array_push($this->effects,Effect::createRandomEffect($stageNumber/10));
    }

    // redefinition de execute
    public function execute(){
        foreach($this->effects as $effect){
            $this->player->applyEffect($effect);
        }
    }

    public function toHTML(){
        $effects_html = '';
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
                <hr>
            </div>
        </div>
HTML
;   
        return $res;
    }    
}