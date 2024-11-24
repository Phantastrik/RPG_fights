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
    private static $ability_spell_defend;
    private static $ability_spell_enrage;
    private static $ability_spell_concentrate;
    private static $ability_spell_weaken;
    private static $ability_spell_vulnerate;
    private static $preset_ABILITIES;
    private static $preset_effect_refresh;
    private static $preset_effect_cafeine;
    private static $preset_effect_roids;
    private static $preset_effect_meditation;
    private static $preset_effect_iron;
    private static $preset_effect_weaken;
    private static $preset_effect_defend;
    private static $preset_effect_rage;
    private static $preset_effect_concentration;
    private static $preset_effect_vulnerate;




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
            "gobelin",
            "papillon",
            "kobold",
            "wazo",
            "rhino",
            "Vilnius",
            "Zumba",
            "Cafeu",
            "Culmin"
        );


        self::$preset_effect_refresh = new Effect("Refresh", 1, true);
        self::$preset_effect_refresh->setModifierKey("pv_modifier", 100)->setModifierKey("pm_modifier", 100);
        self::$preset_effect_cafeine = new Effect("Un bon cafe", 3);
        self::$preset_effect_cafeine->setModifierKey("vitesse_modifier", 25);
        self::$preset_effect_roids = new Effect("Steroides", 2);
        self::$preset_effect_roids->setModifierKey("attaque_modifier", 25)->setModifierKey("defense_modifier", -10);
        self::$preset_effect_meditation = new Effect("Meditation", 4);
        self::$preset_effect_meditation->setModifierKey("sagesse_modifier", 5)->setModifierKey("defense_modifier", 5);
        self::$preset_effect_iron = new Effect("Iron balls", 1, true);
        self::$preset_effect_iron->setModifierKey("defense_modifier", 30);
        // effects de capacit
        self::$preset_effect_weaken = new Effect("Weaken", 4);
        self::$preset_effect_weaken->setModifierKey("attaque_modifier", -25);
        self::$preset_effect_concentration = new Effect("wise", 4);
        self::$preset_effect_concentration->setModifierKey("sagesse_modifier", 20);
        self::$preset_effect_defend  = new Effect("defend", 4);
        self::$preset_effect_defend->setModifierKey("defense_modifier", 20);
        self::$preset_effect_rage = new Effect("rage", 4);
        self::$preset_effect_rage->setModifierKey("attaque_modifier", 20);
        self::$preset_effect_vulnerate = new Effect("vulnerate", 4);
        self::$preset_effect_vulnerate->setModifierKey("defense_modifier", -25);


        // effects 
        self::$preset_EFFECT = array(
            "refresh" => self::$preset_effect_refresh,
           "cafeine" => self::$preset_effect_cafeine,
           "roids" => self::$preset_effect_roids,
           "meditation" => self::$preset_effect_meditation,
           "iron" => self::$preset_effect_iron
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

        self::$ability_spell_defend = new SpellAbility("defend", self::$preset_effect_defend, 1);
        self::$ability_spell_defend->setEffectTargetPlayer(true);
        self::$ability_spell_defend->setEffectTargetEnemy(false);
        self::$ability_spell_enrage = new SpellAbility("enrage", self::$preset_effect_rage, 1);
        self::$ability_spell_enrage->setEffectTargetPlayer(true);
        self::$ability_spell_enrage->setEffectTargetEnemy(false);
        self::$ability_spell_concentrate = new SpellAbility("concentrate", self::$preset_effect_concentration, 1);
        self::$ability_spell_concentrate->setEffectTargetPlayer(true);
        self::$ability_spell_concentrate->setEffectTargetEnemy(false);
        self::$ability_spell_weaken = new SpellAbility("weaken", self::$preset_effect_weaken, 1);
        self::$ability_spell_weaken->setEffectTargetPlayer(false);
        self::$ability_spell_weaken->setEffectTargetEnemy(true);
        self::$ability_spell_vulnerate = new SpellAbility("vulnerate", self::$preset_effect_vulnerate, 1);
        self::$ability_spell_vulnerate->setEffectTargetPlayer(false);
        self::$ability_spell_vulnerate->setEffectTargetEnemy(true);

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
            ),
            "spell" => array(
                "defend" => self::$ability_spell_defend,
                "enrage" => self::$ability_spell_enrage,
                "concentrate" => self::$ability_spell_concentrate,
                "weaken" => self::$ability_spell_weaken,
                "vulnerate" => self::$ability_spell_vulnerate
            )
        );




        self::$preset_player_warrior = new Warrior(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["physic"]["shieldBash"]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["physic"]["tacle"]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["spell"]["defend"]);
        self::$preset_player_warrior->addAbility(self::$preset_ABILITIES["spell"]["enrage"]);
        self::$preset_player_rogue = new Rogue(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["physic"]["stab"]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["physic"]["tacle"]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["spell"]["weaken"]);
        self::$preset_player_rogue->addAbility(self::$preset_ABILITIES["spell"]["vulnerate"]);
        self::$preset_player_mage = new Mage(self::$preset_PLAYER_NAMES[array_rand(self::$preset_PLAYER_NAMES)]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["magic"]["fizz"]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["magic"]["woosh"]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["spell"]["concentrate"]);
        self::$preset_player_mage->addAbility(self::$preset_ABILITIES["spell"]["weaken"]);

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
    public static function getPreset_PLAYER_NAMES()
    {
        return self::$preset_PLAYER_NAMES;
    }
    public static function getPreset_MONSTER_NAMES()
    {
        return self::$preset_MONSTER_NAMES;
    }
    public static function getPreset_ABILITIES()
    {
        return self::$preset_ABILITIES;
    }
    public static function getPreset_EFFECT()
    {
        return self::$preset_EFFECT;
    }
    public static function getPreset_PLAYER()
    {
        return self::$preset_PLAYER;
    }
    public static function getPreset_MONSTER()
    {
        return self::$preset_MONSTER;
    }
}
Presets::init();
