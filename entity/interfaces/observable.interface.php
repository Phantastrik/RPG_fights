<?php

Interface Observable {
    public function subscribe(Observer $obs);
    public function notify();
}