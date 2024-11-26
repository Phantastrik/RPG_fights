<?php

require_once __DIR__ . '/autoload.php';

class Presets
{
    // names
    private static $preset_PLAYER_NAMES;
    private static $preset_MONSTER_NAMES;
    // abilities
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
    // - monster ability
    private static $ability_physic_poc;
    private static $ability_spell_burn;
    private static $ability_spell_stun;
    private static $ability_physic_slice;
    private static $ability_physic_claw;
    private static $ability_physic_bonk;
    private static $ability_physic_chop;
    private static $ability_magic_sparkle;
    private static $ability_magic_boom;
    private static $ability_magic_melancholia;

    private static $ability_spell_charge;
    private static $ability_spell_dry;




    // effects
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

    private static $preset_effect_burn;
    private static $preset_effect_stun;
    private static $preset_effect_dry;

    private static $preset_effect_prayer;
    private static $preset_effect_heal;
    private static $preset_effect_drink;
    private static $preset_effect_sharpen;
    private static $preset_effect_tough;
    private static $preset_effect_study;
    private static $preset_effect_all;
    private static $preset_effect_restore;
    private static $preset_effect_feast;
    private static $preset_EFFECT;

    // player
    private static $preset_player_warrior;
    private static $preset_player_rogue;
    private static $preset_player_mage;
    private static $preset_PLAYER;

    // Events
    private static $preset_event_names;


    // monster

    private static $preset_enemy_gobelin;
    private static $preset_enemy_orc;
    private static $preset_enemy_gorgon;
    private static $preset_enemy_lamia;
    private static $preset_enemy_spirit;
    private static $preset_enemy_spore;
    private static $preset_enemy_shaman;

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

        // effets d'evenement
        self::$preset_effect_refresh = new Effect("Refresh", 1, true);
        self::$preset_effect_refresh->setModifierKey("pv_modifier", 100)->setModifierKey("pm_modifier", 100);

        // un truc qui augmente les HP max
        self::$preset_effect_prayer = new Effect("Prayer", 1, true);
        self::$preset_effect_prayer->setModifierKey("pvMax_modifier", 5);
        // un truc qui soigne un  peu
        self::$preset_effect_heal = new Effect("Heal", 1, true);
        self::$preset_effect_heal->setModifierKey("pv_modifier", 15);
        // un truc qui redonne un peu de mana
        self::$preset_effect_drink = new Effect("Drink", 1, true);
        self::$preset_effect_drink->setModifierKey("pm_modifier", 15);
        // un truc qui augmente de 5 l'attaque
        self::$preset_effect_sharpen = new Effect("Sharpen", 1, true);
        self::$preset_effect_sharpen->setModifierKey("attaque_modifier", 5);
        // un truc qui augmente de 5 la defense
        self::$preset_effect_tough = new Effect("Tough", 1, true);
        self::$preset_effect_tough->setModifierKey("defense_modifier", 5);
        // un truc qui augmente de 5 la sagesse
        self::$preset_effect_study = new Effect("Study", 1, true);
        self::$preset_effect_study->setModifierKey("sagesse_modifier", 5);
        // un truc qui augmente toutes les stats de 1 
        self::$preset_effect_all = new Effect("All", 1, true);
        self::$preset_effect_all->setModifierKey("pvMax_modifier", 1)
            ->setModifierKey("pmMax_modifier", 1)
            ->setModifierKey("attaque_modifier", 1)
            ->setModifierKey("defense_modifier", 1)
            ->setModifierKey("sagesse_modifier", 1)
            ->setModifierKey("vitesse_modifier", 1);
        // un truc qui redonne 50 hp
        self::$preset_effect_restore = new Effect("Restore", 1, true);
        self::$preset_effect_restore->setModifierKey("pv_modifier", 50);
        // un truc qui donne 50 mana
        self::$preset_effect_feast = new Effect("Feast", 1, true);
        self::$preset_effect_feast->setModifierKey("pm_modifier", 50);



        self::$preset_effect_refresh = new Effect("Refresh", 1, true);
        self::$preset_effect_refresh->setModifierKey("pv_modifier", 100)->setModifierKey("pm_modifier", 100);
        self::$preset_effect_cafeine = new Effect("Un bon cafe", 3);
        self::$preset_effect_cafeine->setModifierKey("vitesse_modifier", 25);
        self::$preset_effect_roids = new Effect("Steroides", 3);
        self::$preset_effect_roids->setModifierKey("attaque_modifier", 25)->setModifierKey("defense_modifier", -10);
        self::$preset_effect_meditation = new Effect("Meditation", 4);
        self::$preset_effect_meditation->setModifierKey("sagesse_modifier", 5)->setModifierKey("defense_modifier", 5);
        self::$preset_effect_iron = new Effect("Iron balls", 3);
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

        self::$preset_effect_burn = new Effect("Burn", 3);
        self::$preset_effect_burn->setModifierKey("pv_modifier", -20)
            ->setModifierKey("pvMax_modifier", -20);
        self::$preset_effect_stun = new Effect("Stun", 3);
        self::$preset_effect_stun->setModifierKey("vitesse_modifier", -20);
        self::$preset_effect_dry = new Effect("dry", 1, true);
        self::$preset_effect_dry->setModifierKey("pm_modifier", -20);

        // effects 
        self::$preset_EFFECT = array(
            "refresh" => self::$preset_effect_refresh,
            "cafeine" => self::$preset_effect_cafeine,
            "roids" => self::$preset_effect_roids,
            "meditation" => self::$preset_effect_meditation,
            "iron" => self::$preset_effect_iron,
            "prayer" => self::$preset_effect_prayer,
            "heal" => self::$preset_effect_heal,
            "drink" => self::$preset_effect_drink,
            "sharpen" => self::$preset_effect_sharpen,
            "tough" => self::$preset_effect_tough,
            "study" => self::$preset_effect_study,
            //  "all" => self::$preset_effect_all,
            "restore" => self::$preset_effect_restore,
            "feast" => self::$preset_effect_feast
        );

        self::$preset_event_names = [
            "Stop at the campfire",
            "Something on the way",
            "Trade offer",
            "A strange statue is looking at you",
            "Strategical pause",
            "Lucky day! ",
            "Is someone gazing at me ? ",
            "I've been here before"
        ];


        // Déclarer les objets PhysicAttackAbility avec les noms préfixés
        self::$ability_physic_tacle = new PhysicAttackAbility("Tacle");
        self::$ability_physic_tacle->setStats(array(
            "pm_cost" => 0,
            "basic_damage" => 15,
            "attaque_use" => 1,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.1,
            "spread" => 0.1
        ));

        self::$ability_physic_stab = new PhysicAttackAbility("Stab");
        self::$ability_physic_stab->setStats(array(
            "pm_cost" => 7,
            "basic_damage" => 20,
            "attaque_use" => 0.8,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.5,
            "spread" => 0.2
        ));

        self::$ability_physic_shieldBash = new PhysicAttackAbility("Shield Bash");
        self::$ability_physic_shieldBash->setStats(array(
            "pm_cost" => 7,
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
            "pm_cost" => 0,
            "basic_damage" => 10,
            "attaque_use" => 0,
            "defense_use" => 0,
            "sagesse_use" => 1,
            "vitesse_use" => 0.1,
            "spread" => 0.1
        ));

        // - monster ability
        self::$ability_physic_poc = new PhysicAttackAbility("Poc");
        self::$ability_physic_poc->setStats(array(
            "pm_cost" => 0,
            "basic_damage" => 5,
            "attaque_use" => 1,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.1,
            "spread" => 0.3
        ));
        self::$ability_physic_slice = new PhysicAttackAbility("Slice");
        self::$ability_physic_slice->setStats(array(
            "pm_cost" => 15,
            "basic_damage" => 13,
            "attaque_use" => 1,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.2,
            "spread" => 0.2
        ));
        self::$ability_physic_claw = new PhysicAttackAbility("Claw");
        self::$ability_physic_claw->setStats(array(
            "pm_cost" => 0,
            "basic_damage" => 5,
            "attaque_use" => 1,
            "defense_use" => 0.2,
            "sagesse_use" => 0,
            "vitesse_use" => 0.2,
            "spread" => 0.1
        ));
        self::$ability_physic_bonk = new PhysicAttackAbility("Bonk");
        self::$ability_physic_bonk->setStats(array(
            "pm_cost" => 0,
            "basic_damage" => 10,
            "attaque_use" => 0.5,
            "defense_use" => 0.5,
            "sagesse_use" => 0,
            "vitesse_use" => 0.1,
            "spread" => 0.2
        ));
        self::$ability_physic_chop = new PhysicAttackAbility("Chop");
        self::$ability_physic_chop->setStats(array(
            "pm_cost" => 17,
            "basic_damage" => 15,
            "attaque_use" => 0.8,
            "defense_use" => 0,
            "sagesse_use" => 0,
            "vitesse_use" => 0.3,
            "spread" => 0.1
        ));
        self::$ability_magic_sparkle = new MagicAttackAbility("Sparkle");
        self::$ability_magic_sparkle->setStats(array(
            "pm_cost" => 7,
            "basic_damage" => 15,
            "attaque_use" => 0,
            "defense_use" => 0,
            "sagesse_use" => 1,
            "vitesse_use" => 0.1,
            "spread" => 0.3
        ));
        self::$ability_magic_boom = new MagicAttackAbility("Boom");
        self::$ability_magic_boom->setStats(array(
            "pm_cost" => 25,
            "basic_damage" => 30,
            "attaque_use" => 0,
            "defense_use" => 0.5,
            "sagesse_use" => 0.5,
            "vitesse_use" => 0,
            "spread" => 0.5
        ));
        self::$ability_magic_melancholia = new MagicAttackAbility("Melancholia");
        self::$ability_magic_melancholia->setStats(array(
            "pm_cost" => 12,
            "basic_damage" => 16,
            "attaque_use" => 0.5,
            "defense_use" => 0,
            "sagesse_use" => 0.7,
            "vitesse_use" => 0,
            "spread" => 0.2
        ));

        self::$ability_spell_burn = new SpellAbility("Burn", self::$preset_effect_burn, 15);
        self::$ability_spell_stun = new SpellAbility("Stun", self::$preset_effect_stun, 15);
        self::$ability_spell_charge = new SpellAbility("Charge", self::$preset_effect_all, 15);
        self::$ability_spell_dry = new SpellAbility("Dry", self::$preset_effect_dry, 15);

        self::$ability_spell_defend = new SpellAbility("defend", self::$preset_effect_defend, 5);
        self::$ability_spell_defend->setEffectTargetPlayer(true);
        self::$ability_spell_defend->setEffectTargetEnemy(false);
        self::$ability_spell_enrage = new SpellAbility("enrage", self::$preset_effect_rage, 5);
        self::$ability_spell_enrage->setEffectTargetPlayer(true);
        self::$ability_spell_enrage->setEffectTargetEnemy(false);
        self::$ability_spell_concentrate = new SpellAbility("concentrate", self::$preset_effect_concentration, 5);
        self::$ability_spell_concentrate->setEffectTargetPlayer(true);
        self::$ability_spell_concentrate->setEffectTargetEnemy(false);
        self::$ability_spell_weaken = new SpellAbility("weaken", self::$preset_effect_weaken, 5);
        self::$ability_spell_weaken->setEffectTargetPlayer(false);
        self::$ability_spell_weaken->setEffectTargetEnemy(true);
        self::$ability_spell_vulnerate = new SpellAbility("vulnerate", self::$preset_effect_vulnerate, 5);
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


        // MONSTERS 
        // gobelin
        self::$preset_enemy_gobelin = new Monster("gobelin");
        self::$preset_enemy_gobelin->setPv(90)
            ->setPvMax(90)
            ->setPm(30)
            ->setPmMax(30)
            ->setAttaque(8)
            ->setDefense(9)
            ->setSagesse(13)
            ->setvitesse(15)
            ->addAbility(self::$ability_physic_poc)
            ->addAbility(self::$ability_spell_charge);
        // orc              
        self::$preset_enemy_orc = new Monster("orc");
        self::$preset_enemy_orc->setPv(100)
            ->setPvMax(100)
            ->setPm(50)
            ->setPmMax(50)
            ->setAttaque(13)
            ->setDefense(8)
            ->setSagesse(5)
            ->setvitesse(12)
            ->addAbility(self::$ability_physic_bonk)
            ->addAbility(self::$ability_physic_chop)
            ->addAbility(self::$ability_spell_enrage);
        // gorgon
        self::$preset_enemy_gorgon = new Monster("gorgon");
        self::$preset_enemy_gorgon->setPv(130)
            ->setPvMax(130)
            ->setPm(100)
            ->setPmMax(100)
            ->setAttaque(8)
            ->setDefense(15)
            ->setSagesse(11)
            ->setvitesse(10)
            ->addAbility(self::$ability_physic_claw)
            ->addAbility(self::$ability_magic_melancholia)
            ->addAbility(self::$ability_spell_stun);
        // lamia
        self::$preset_enemy_lamia = new Monster("lamia");
        self::$preset_enemy_lamia->setPv(150)
            ->setPvMax(150)
            ->setPm(50)
            ->setPmMax(50)
            ->setAttaque(17)
            ->setDefense(7)
            ->setSagesse(10)
            ->setvitesse(13)
            ->addAbility(self::$ability_physic_slice)
            ->addAbility(self::$ability_physic_claw)
            ->addAbility(self::$ability_spell_stun);
        // spirit
        self::$preset_enemy_spirit = new Monster("spirit");
        self::$preset_enemy_spirit->setPv(35)
            ->setPvMax(35)
            ->setPm(150)
            ->setPmMax(150)
            ->setAttaque(1)
            ->setDefense(12)
            ->setSagesse(15)
            ->setvitesse(3)
            ->addAbility(self::$ability_magic_boom)
            ->addAbility(self::$ability_magic_sparkle)
            ->addAbility(self::$ability_spell_dry);
        // spore
        self::$preset_enemy_spore = new Monster("spore");
        self::$preset_enemy_spore->setPv(55)
            ->setPvMax(55)
            ->setPm(100)
            ->setPmMax(100)
            ->setAttaque(10)
            ->setDefense(13)
            ->setSagesse(20)
            ->setvitesse(10)
            ->addAbility(self::$ability_physic_poc)
            ->addAbility(self::$ability_magic_boom)
            ->addAbility(self::$ability_spell_vulnerate);
        // shaman
        self::$preset_enemy_shaman = new Monster("shaman");
        self::$preset_enemy_shaman->setPv(115)
            ->setPvMax(115)
            ->setPm(120)
            ->setPmMax(120)
            ->setAttaque(10)
            ->setDefense(18)
            ->setSagesse(20)
            ->setvitesse(10)
            ->addAbility(self::$ability_physic_bonk)
            ->addAbility(self::$ability_magic_sparkle)
            ->addAbility(self::$ability_spell_dry);

        self::$preset_MONSTER = array(
            self::$preset_enemy_gobelin,
            self::$preset_enemy_orc,
            self::$preset_enemy_gorgon,
            self::$preset_enemy_lamia,
            self::$preset_enemy_spirit,
            self::$preset_enemy_spore,
            self::$preset_enemy_shaman
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
    public static function getPreset_event_names()
    {
        return self::$preset_event_names;
    }
}
Presets::init();
