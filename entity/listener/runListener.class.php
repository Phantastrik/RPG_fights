<?php


require_once __DIR__.'/../../config/autoload.php';

class RunListener implements Observer{

    private $notificationLog = [];

    public function update($data){
        array_push($this->notificationLog,$data);
        echo(json_encode($data));
        echo('<hr>');
    }
    public function toHTML(){
        $i = 0;

        $res = <<<HTML
    <ul class="list-group">
HTML
;
        $res.=<<<HTML
    </ul>
HTML
;
        return $res;
    }

}