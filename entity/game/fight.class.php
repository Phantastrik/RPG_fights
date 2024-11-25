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
    private $notification = null;
    private $exportData = [
        "type" => "fight",
        "fightRound" => array()
    ];

    public function __construct(int $stageNumber, Personnage $player, Personnage $enemy){
        parent::__construct($player, $stageNumber);
        $this->player = $player;
        $this->enemy = $enemy;
        $this->roundNumber = 1;
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
        $round = new FightRound($this->player,$this->enemy);
        if ($choosedAbility != null) {
            $round->setChoosedAbility($choosedAbility);
        }
        $round->execute();

        $this->updateStatus();
      
        array_push($this->exportData["fightRound"],$round->arrayExport() );
        return $this;
    }
    public function rewardWinner(){
        if($this->playerWon){
            $xp =round($this->enemy->calculateExpToNextLevel()/3); 
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
        // on recupere la notif
        $this->notification = $data;
        
        // un tour est terminé
        /*
        if($data["done"]){
            // on verifie si un des combattants est mort;
            $this->AWon = $this->enemy->isDead();
            $this->BWon = $this->player->isDead();
            $this->done = $this->AWon || $this->BWon;
            if($this->AWon){
                $this->notification["winner"] = $this->player;
            }else{
                if($this->BWon){
                    $this->notification["winner"] = $this->enemy;
                }
            }
            
            $this->rewardWinner();
            $this->roundNumber++;
        }
        */
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
        $res = parent::arrayExport();
        $res["type"] = "fight";
        $res["done"] = $this->done;
        $res["enemy"] = $this->enemy->arrayExport();
        $res["playerWon"] = $this->playerWon;
        $res["fightRound"] = $this->exportData["fightRound"];
        return $res;
    }

}