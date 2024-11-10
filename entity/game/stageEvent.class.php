<?php

require_once('stage.class.php');

class EventStage extends Stage{
    protected $name;
    protected $text;
    protected $effects = [];

    public function __construct(int $stageNumber){
        $this->name = "Evenement";
        $this->text = "Il se passe quelque chose là, non ?";
        array_push($this->effects,Effect::createRandomEffect(0.2));

    }
}