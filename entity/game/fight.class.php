<?php
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../personnages/personnage.class.php');
require_once('fightRound.class.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\interfaces\observer.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\interfaces\observable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\interfaces\arrayExportable.interface.php');
require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'../interfaces/executable.interface.php');
// Fight composé de tours 
/*



*/


Class Fight extends Stage implements Observer, Executable, Observable, ArrayExportable{

    private Personnage $fighterB;
    private int $roundNumber;
    private bool $AWon = false;
    private bool $BWon = false;
    private $observers = [];
    private $notification = null;
    private $exportData = [
        "fightRound" => array()
    ];

    public function __construct(int $stageNumber, Personnage $player, Personnage $fighterB){
        parent::__construct($player, $stageNumber);
        $this->player = $player;
        $this->fighterB = $fighterB;
        $this->roundNumber = 1;
    }

    public static function createFromStageNumber(Personnage $fighterA,$stageNumber){
        $baseLevel = round($stageNumber/3);
        $fighterB = new Monster(null,$baseLevel);
        return new Fight($stageNumber,$fighterA,$fighterB);
    }

    // Getters / Setters
    public function getRoundNumber(){
        return $this->roundNumber;
    }

    public function isAWon(){
        return $this->AWon;
    }
    public function isBWon(){
        return $this->BWon;
    }

    public function getPlayer(){
        return $this->player;
    }
    public function getFighterB(){
        return $this->fighterB;
    }

    // 
    public function playRound(){
        $round = new FightRound($this);
        $round->execute();
        array_push($this->exportData["fightRound"],$round->arrayExport() );
        return $this;
    }
    public function rewardWinner(){
        if($this->AWon){
            $this->player->gainExp(
                round($this->fighterB->calculateExpToNextLevel()/3)
            );
        }elseif($this->BWon){
            // var_dump("fighter B gain XP");
            $this->fighterB->gainExp(
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
        if($data["done"]){
            // on verifie si un des combattants est mort;
            $this->AWon = $this->fighterB->isDead();
            $this->BWon = $this->player->isDead();
            $this->done = $this->AWon || $this->BWon;
            if($this->AWon){
                $this->notification["winner"] = $this->player;
            }else{
                if($this->BWon){
                    $this->notification["winner"] = $this->fighterB;
                }
            }
            
            $this->rewardWinner();
            $this->roundNumber++;
        }
        
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
            $obs->update($this->notification);
        }
    }

    public function toHTML(){
        $fightResult = $this->done ? 
            ($this->AWon ? $this->player->toTinyHTML() : $this->fighterB->toTinyHTML()) :
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
                {$this->fighterB->toTinyHTML()}
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
        $res["enemy"] = $this->fighterB->arrayExport();
        $res["playerWon"] = $this->AWon;
        $res["fightRound"] = $this->exportData["fightRound"];
        return $res;
    }

}