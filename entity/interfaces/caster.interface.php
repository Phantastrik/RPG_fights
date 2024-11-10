<?php
require_once(realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR).'../ability/ability.class.php');

interface Caster{
    public function cast(Ability $ability);
}