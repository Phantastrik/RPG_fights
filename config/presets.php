<?php

require_once __DIR__ . '/autoload.php';

class Presets
{
    private static $preset_PLAYER_NAMES;
    private static $preset_MONSTER_NAMES;
    private static $ability_physic_tacle;
    private static $ability_physic_stab;
    private static $ability_physic_shieldBash;
    private static $ability_magic_woosh;
    private static $ability_magic_fizz;
    private static $preset_ABILITIES;
    private static $preset_effect_refresh;
    private static $preset_effect_cafeine;
    private static $preset_effect_roids;
    private static $preset_effect_meditation;
    private static $preset_effect_iron;
    private static $preset_EFFECT;
    private static $preset_player_warrior;
    private static $preset_player_rogue;
    private static $preset_player_mage;
    private static $preset_PLAYER;
    private static $preset_MONSTER;

    public static function init()
    {

        // player names 
        self::$preset_PLAYER_NAMES = array(
            "Claude",
            "Andrea",
            "Zigler",
            "Ortho",
            "Cyclo",
            "Pampa",
            "Karl",
            "Emish",
            "Plum",
            "Pepple"
        );
        // Monster Names
        self::$preset_MONSTER_NAMES = array(
            "Gobelin",
            "Papillon",
            "Kobold",
            "Wazo",
            "Rhino",
            "Vilnius",
            "Zumba",
            "Cafeu",
            "Culmin"
        );


        // Déclarer les objets PhysicAttackAbility avec les noms préfixés
        self::$ability_physic_tacle = new PhysicAttackAbility("Tacle");
        self::$ability_physic_tacle->setStats(array(
            "pm_cost" => 3,
            "basic_damage" => 15,
            "attaque_use" => 1,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.1,
            "spread" => 0.1
        ));

        self::$ability_physic_stab = new PhysicAttackAbility("Stab");
        self::$ability_physic_stab->setStats(array(
            "pm_cost" => 5,
            "basic_damage" => 20,
            "attaque_use" => 0.8,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.5,
            "spread" => 0.2
        ));

        self::$ability_physic_shieldBash = new PhysicAttackAbility("Shield Bash");
        self::$ability_physic_shieldBash->setStats(array(
            "pm_cost" => 2,
            "basic_damage" => 10,
            "attaque_use" => 0.2,
            "defense_use" => 1,
            "sagesse_use" => 0,
            "vitesse_use" => 0,
            "spread" => 0.3
        ));

        // Déclarer les objets MagicAttackAbility avec les noms préfixés

        self::$ability_magic_woosh = new MagicAttackAbility("WoOOosh");
        self::$ability_magic_woosh->setStats(array(
            "pm_cost" => 10,
            "basic_damage" => 25,
            "attaque_use" => 0,
            "defense_use" => 0,
            "sagesse_use" => 1.2,
            "vitesse_use" => 0.3,
            "spread" => 0.5
        ));

        self::$ability_magic_fizz = new MagicAttackAbility("Fizz");
        self::$ability_magic_fizz->setStats(array(
            "pm_cost" => 3,
            "basic_damage" => 10,
            "attaque_use" => 0,
            "defense_use" => 0,
            "sagesse_use" => 1,
            "vitesse_use" => 0.1,
            "spread" => 0.1
        ));

        // Construction des tableaux de capacités à partir des objets créés

        self::$preset_ABILITIES = array(
            "physic" => array(
                "tacle" => self::$ability_physic_tacle,
                "stab" => self::$ability_physic_stab,
                "shieldBash" => self::$ability_physic_shieldBash
            ),
            "magic" => array(
                "woosh" => self::$ability_magic_woosh,
                "fizz" => self::$ability_magic_fizz
            )
        );



        self::$preset_effect_refresh = new Effect("Refresh", 1);
        self::$preset_effect_refresh->setModifierKey("pv", 100)->setModifierKey("pm", 100);
        self::$preset_effect_cafeine = new Effect("Un bon cafe", 3);
        self::$preset_effect_cafeine->setModifierKey("vitesse", 25);
        self::$preset_effect_roids = new Effect("Steroides", 2);
        self::$preset_effect_roids->setModifierKey("attaque", 25)->setModifierKey("defense", -10);
        self::$preset_effect_meditation = new Effect("Meditation", 4);
        self::$preset_effect_meditation->setModifierKey("sagesse", 5)->setModifierKey("defense", 5);
        self::$preset_effect_iron = new Effect("Iron balls", 1);
        self::$preset_effect_iron->setModifierKey("defense", 30);


        // effects 
        self::$preset_EFFECT = array(
            "refresh" => self::$preset_effect_refresh,
            "cafeine" => self::$preset_effect_cafeine,
            "roids" => self::$preset_effect_roids,
            "meditation" => self::$preset_effect_meditation,
            "iron" => self::$preset_effect_iron
        );

        self::$preset_player_warrior = new Warrior(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["physic"]["shieldBash"]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["physic"]["tacle"]);
        self::$preset_player_rogue = new Rogue(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["physic"]["stab"]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["physic"]["tacle"]);
        self::$preset_player_mage = new Mage(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["magic"]["fizz"]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["magic"]["woosh"]);

        self::$preset_PLAYER = array(
            "warrior" => self::$preset_player_warrior,
            "rogue" => self::$preset_player_rogue,
            "mage" => self::$preset_player_mage
        );


        self::$preset_MONSTER = array(
            "little" => new Monster("Slime", 1)
        );
    }

    // getters 
    public static function getPreset_PLAYER_NAMES(){return self::$preset_PLAYER_NAMES;}
    public static function getPreset_MONSTER_NAMES(){return self::$preset_MONSTER_NAMES;}
    public static function getPreset_ABILITIES(){return self::$preset_ABILITIES;}
    public static function getPreset_EFFECT(){return self::$preset_EFFECT;}
    public static function getPreset_PLAYER(){return self::$preset_PLAYER;}
    public static function getPreset_MONSTER(){return self::$preset_MONSTER;}

}
Presets::init();