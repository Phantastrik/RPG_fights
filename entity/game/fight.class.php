<?php
require_once __DIR__.'/../../config/autoload.php';
// Fight composé de tours 
/*



*/


Class Fight extends Stage implements Observer, Executable, Observable, ArrayExportable{

    private Personnage $enemy;
    private int $roundNumber;
    private bool $playerWon = false;
    private bool $enemyWon = false;
    private $observers = [];
    private $fightRounds = [];
    private $exportData = [
        "type" => "fight",
        "fightRound" => array()
    ];

    public function __construct(int $stageNumber, Personnage $player, Personnage $enemy){
        parent::__construct($player, $stageNumber);
        $this->player = $player;
        $this->enemy = $enemy;
        $this->roundNumber = 1;
        $this->generateRound();
    }

    public static function createFromStageNumber(Personnage $player,$stageNumber){
        $baseLevel = round($stageNumber/3);
        $enemy = Monster::createFromPreset();
        for ($i=0; $i < $baseLevel; $i++) { 
            $enemy->levelUp();
        }
        return new Fight($stageNumber,$player,$enemy);
    }

    // Getters / Setters
    public function getRoundNumber(){
        return $this->roundNumber;
    }

    public function isPlayerWon(){
        return $this->playerWon;
    }
    public function isEnemyWon(){
        return $this->enemyWon;
    }

    public function getPlayer(){
        return $this->player;
    }
    public function getEnemy(){
        return $this->enemy;
    }

    public function updateStatus(){
        $this->playerWon = $this->enemy->isDead();
        $this->enemyWon = $this->player->isDead();
        if($this->playerWon || $this->enemyWon){
            $this->rewardWinner();
            $this->done = true;
        }
    }
    // 
    public function playRound($choosedAbility = null){
        $round = $this->fightRounds[$this->getCurrentRound()];
        if ($choosedAbility != null) {
            $round->setChoosedAbility($choosedAbility);
        }
        $round->execute();
        $this->updateStatus();

        if(!$this->done){
            $this->generateRound();
        }
        
        return $this;
    }
    public function generateRound(){
        $round = new FightRound($this->player,$this->enemy);
        array_push($this->fightRounds,$round);
        return $this;
        
    }
    public function getCurrentRound(){
        return count($this->fightRounds)-1;
    }
    public function rewardWinner(){
        if($this->playerWon){
            $xp =round($this->enemy->getNiveau()*100); 
            $rand = (mt_rand(0,100)-50)/100;
            $xp *= (1+$rand);


            $this->player->gainExp(
                $xp
            );
        }elseif($this->enemyWon){
            $this->enemy->gainExp(
                round($this->player->calculateExpToNextLevel()/3)
            );
        }else{

        }
    }


    // ---IMPLEMENTS Observer
    public function update($data){ 
        // push la notif
        $this->notify();
        return $this;
    } 

    // ---IMPLEMENTS Executale
    public function execute(){
        while(!$this->done){
            $this->playRound();
        }
        return $this;
    }

    // ---IMPLEMENTS Observable
    public function subscribe($observer){
        array_push($this->observers,$observer);
        return $this;
    }
      // ---IMPLEMENTS Observable
      public function notify(){
        // mise a jour de la notif envoyée
        foreach($this->observers as $obs){
            $obs->update($this->exportData);
        }
    }

    public function toHTML(){
        $fightResult = $this->done ? 
            ($this->playerWon ? $this->player->toTinyHTML() : $this->enemy->toTinyHTML()) :
            '<span class="fs-2 text-center">NOT PLAYED</span>'
        ;
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
                <span class="fs-2 text-center">VS</span>
            </div>
            <div class="col">
                {$this->enemy->toTinyHTML()}
            </div>
            <div class="col">
                {$fightResult}
            </div>
            <hr>
        </div>
    </div>
HTML
;   
        return $res;
    }

    public function arrayExport(){
        $fightRounds = array();
        foreach ($this->fightRounds as $fr) {
            array_push($fightRounds,$fr->arrayExport());
        }
        $res = parent::arrayExport();
        $res["type"] = "fight";
        $res["done"] = $this->done;
        $res["enemy"] = $this->enemy->arrayExport();
        $res["playerWon"] = $this->playerWon;
        $res["fightRound"] = $fightRounds;
        $res["currentRound"] = $this->getCurrentRound();
        return $res;
    }

}