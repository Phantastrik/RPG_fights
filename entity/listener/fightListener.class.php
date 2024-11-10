<?php


require_once(realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR).'..\interfaces\observer.interface.php');

class FightListener implements Observer{

    private $fightResultOnly = false;
    private $notificationLog = [];

    public function update($data){
        array_push($this->notificationLog,$data);
    }

    public function setFightResulOnly($choice){
        $this->fightResultOnly = $choice;
        return $this;
    }

    public function toHTML(){
        $i = 0;

        $res = <<<HTML
    <ul class="list-group">
HTML
;
        foreach($this->notificationLog as $notification){
            if($this->fightResultOnly){
                if(isset($notification["winner"]) && !is_null($notification["winner"])){
                    $i++;
                $res.=<<<HTML
        <li class="list-group-item"><h2>log N°{$i}</h2>
            <div>
                {$notification["winner"]->getName()} WON
                {$notification["winner"]->toTinyHTML()}
            </div>
        </li>
HTML
;
                }
            }else{
                $i++;
                $res.=<<<HTML
        <li class="list-group-item"><h2>log N°{$i}</h2>
            <div>
                {$notification["fighter0"]["name"]} uses {$notification["fighter0"]["usedAbility"]} on {$notification["fighter1"]["name"]}.<br>
                {$notification["fighter0"]["name"]} dealt {$notification["fighter0"]["damageDealt"]}, {$notification["fighter1"]["name"]} received {$notification["fighter1"]["damageReceived"]}.<br>
                {$notification["fighter1"]["name"]} uses {$notification["fighter1"]["usedAbility"]} on {$notification["fighter0"]["name"]}.<br>
                {$notification["fighter1"]["name"]} dealt {$notification["fighter1"]["damageDealt"]}, {$notification["fighter0"]["name"]} received {$notification["fighter0"]["damageReceived"]}.<br>
HTML
;
                if(isset($notification["winner"]) && !is_null($notification["winner"])){
                    $res.=('<span class="fw-bold">'.$notification["winner"]->getName().' WON</span>');
                }
                $res.=<<<HTML
            </div>
            {$notification["winner"]->toTinyHTML()}
        </li>
HTML
;
            }
            
        }
        $res.=<<<HTML
    </ul>
HTML
;
        return $res;
    }

}