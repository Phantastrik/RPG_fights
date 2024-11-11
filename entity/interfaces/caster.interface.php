<?php
require_once __DIR__.'/../../config/autoload.php';

interface Caster{
    public function cast(Ability $ability);
}