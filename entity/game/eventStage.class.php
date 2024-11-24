<?php

require_once __DIR__ . '/../../config/autoload.php';

class EventStage extends Stage implements ArrayExportable
{
    protected $name;
    protected $text;
    protected $effects = [];
    protected $choosedEffectIndex = null;

    public function __construct(int $stageNumber, Personnage $player)
    {
        parent::__construct($player, $stageNumber);
        $names = Presets::getPreset_event_names();
        $this->name = $names[mt_rand(0,count($names)-1)];
        $this->text = "Evenement";
        for ($i=0; $i < 3 ; $i++) { 
            $effect = Effect::createFromPreset();
            array_push($this->effects, $effect);
        }
       
    }

    // redefinition de execute
    public function execute()
    {
        if ($this->choosedEffectIndex == null) { // s'il n'y a pas eu de choix on en prend un au hasard
            $this->choosedEffectIndex = mt_rand(0, count($this->effects) - 1);
        }
        $this->player->applyEffect($this->effects[$this->choosedEffectIndex]->copy());
        
        $this->done = true;
    }

    public function getChoosedEffect()
    {
        return $this->effects[$this->choosedEffectIndex];
    }
    public function setChoosedEffect(int $i)
    {
        $this->choosedEffectIndex = $i;
        return $this;
    }

    public function toHTML()
    {
        $effects_html = '';
        // var_dump($this->effects);
        // echo('<br>');
        foreach ($this->effects as $e) {
            $effects_html .= $e->toHTML();
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
HTML;
        return $res;
    }
    public function arrayExport()
    {
        $res = parent::arrayExport();
        $effects_array = array();
        foreach ($this->effects as $eff) {
            array_push($effects_array, $eff->arrayExport());
        }
        $res["type"] = "event";
        $res["name"] = $this->name;
        $res["text"] = $this->text;
        $res["effects"] = $effects_array;
        $res["choosedEffectIndex"] = $this->choosedEffectIndex;
        return $res;
    }
}
