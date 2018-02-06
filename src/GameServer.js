const WebSocket = require('ws');
const url = require('url');

const PubgRequest = require('./Pubg/PubgRequest');
const PubgResponse = require('./Pubg/PubgResponse');
const PubgClient = require('./Pubg/PubgClient');

const rp = require('request-promise');

class GameServer {
    constructor(port = 8001) {
        this.port = port;
        this.lastAuth = null;
        this.lastPubgClient = null;

        this.start();
    }

    start() {
        this.server = new WebSocket.Server({ port: this.port });
        this.server.on('connection', this.handleConnection.bind(this));

        console.log(`EntryServer started at http://localhost:${this.port}`);
    }

    handleConnection(clientSocket, req) {
        const [, encodedUri, query] = req.url.split('/');
        const qs = url.parse(req.url, true).query;
        const uri = decodeURIComponent(encodedUri);

        var ID = qs.playerNetId;
        var Username = qs.id;
        var Password = qs.password;
        var Region = qs.cc;
        var ClientVersion = qs.clientGameVersion;

        console.log('New connection')
        console.log(' - ID: ' + ID)
        console.log(' - Username: ' + Username)
        console.log(' - Password: ' + Password)
        console.log(' - Client Version: ' + ClientVersion)
        console.log(' - Region: ' + Region + "\n\n")

        //var Failed = '[0,null,true,{Error:"CG:PASSCORD_MISMATCH"}]'
        var data = '[0,null,"ClientApi","ConnectionAccepted","account.d97a9d0dc25948f18348816373392734",{"profile":{"Nickname":"zzVertigo","ProfileStatus":null,"InviteAllow":null,"Skin":{"Gender":"male","Hair":"skindesc.male.hair.02.02","Face":"skindesc.male.face.01.01","Presets":"male:M_Hair_B_02:M_Face_01:M_NudeBody_01"}},"inventory":null,"record":null,"account":{"AccountId":"account.d97a9d0dc25948f18348816373392734","Region":"na","PartnerId":null},"inviteAllow":null,"playinggame":null,"avatarUrl":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/58/58996926e5392cfeafbc867571cb7fc75fb5ecba.jpg","lobbyAppConfig":{"REPORT_URL":"http://report.playbattlegrounds.com/report"}}]';

        clientSocket.send(data);

        var dataParty = '[0,null,"ClientApi","Invalidate","client.party",null,null]';
        var dataMatch = '[0,null,"ClientApi","Invalidate","client.match",null,null]';
        var dataGame = '[0,null,"ClientApi","Invalidate","client.game",null,null]';
        var dataEvent = '[0,null,"ClientApi","Invalidate","client.event",null,null]';

        clientSocket.send(dataParty);
        clientSocket.send(dataMatch);
        clientSocket.send(dataGame);
        clientSocket.send(dataEvent);

        var dataPlayer = '[0,null,"ClientApi","InventoryInitialized",{"Items":[{"ItemDescId":"itemdesc.11010028","PartDescId":"partdesc.torso","Name":"Dirty Long-sleeved T-shirt","Desc":"","PresetId":"Item_Body_G_04","Quality":"common","Count":1,"BuyPrice":0,"SellPrice":30,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21010001","PartDescId":"partdesc.torso","Name":"T-shirt (White)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Body_F_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21010002","PartDescId":"partdesc.torso","Name":"T-shirt (GREY)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Body_F_04","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21020001","PartDescId":"partdesc.legs","Name":"Combat Pants (khaki)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Legs_C_02","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21020002","PartDescId":"partdesc.legs","Name":"Combat Pants (Brown)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Legs_C_03","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21030002","PartDescId":"partdesc.feet","Name":"Hi-top Trainers","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Feet_E_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21090001","PartDescId":"partdesc.belt","Name":"Utility Belt","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Belt_D_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.31010013","PartDescId":"partdesc.torso","Name":"PIONEER SHIRT","Desc":"","PresetId":"Item_Body_EA_01","Quality":"event","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false}],"Equips":[[{"ItemDescId":"itemdesc.21010002","PartDescId":"partdesc.torso","PresetId":"Item_Body_F_04"},{"ItemDescId":"itemdesc.21020002","PartDescId":"partdesc.legs","PresetId":"Item_Legs_C_03"},{"ItemDescId":"itemdesc.21030002","PartDescId":"partdesc.feet","PresetId":"Item_Feet_E_01"},{"ItemDescId":null,"PartDescId":"partdesc.hands","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.outer","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.head","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.mask","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.eyes","PresetId":null},{"ItemDescId":"itemdesc.21090001","PartDescId":"partdesc.belt","PresetId":"Item_Belt_D_01"}]],"Currencies":[{"CurrencyId":"currencydesc.bp","Amount":999999}],"History":[{"ItemDescId":"itemdesc.10000000","Count":1}]}]'

        clientSocket.send(dataPlayer);

        clientSocket.on('message', data => {
            data = PubgRequest.parse(data);

            var ClientCallback = data["callbackId"];
            var ServerCallback = -data["callbackId"];

            var Method = data["method"];

            var Arguments = data["arguments"];

            switch(Method)
            {
                // case "customgame@CustomGameApi@GetCustomGameState":
                //     clientSocket.send('[' + ServerCallback + ',null,true,{"CreationTime":"2018-01-31T04:41:10.3370098+00:00","StartTime":"0001-01-01T00:00:00","LastOwnerJoined":"2018-01-31T04:41:10.3370104+00:00","PartnerId":"huoma033","PartnerNickname":"huoma033","PartnerAccountId":"account.0595bc8962234f43b7198e2213fe5ae0","PartnerLevel":"","Stream":null,"State":"Waiting","Header":null,"PlayerCount":22,"Config":{"PartnerId":"huoma033","Title":"IBar League 04","Passcord":"","MapId":"/Game/Maps/Erangel/Erangel_Main","LeagueId":0,"IsLeague":false,"TeamSize":1,"IsZombie":false,"MultiplierZombieToZombieDamage":0,"MaxPlayers":100,"WarmupTime":60,"Dbno":true,"ReviveCastingTime":10,"MultiplierGroggyDamagePerSecond":1,"SpecSolo":false,"FPCOnly":false,"MapOpt":"Clear","PlayzoneProgress":1,"RedzoneFreq":0,"BlueZoneCentralizationFactor":0,"CarePackageFreq":5,"Region":"AS Server","Lock":false,"GameId":4136,"StreamerEventMode":false,"Car":1,"Boat":1,"MultiplierPunchDamage":1,"WSniperRifle":3,"WAssaultRifle":2.9,"WHuntingRifle":3,"WLMG":3,"WSMG":3,"WShotGun":3,"WPistol":3,"WThrowWeapon":1,"WMelee":1,"Wetc":1,"AScope":1,"AMagazine":1,"AMuzzle":1,"AStockforegrip":1,"Item":1,"Equip":1,"Costume":1,"Ammo":1,"MedKit":1,"FirstAid":1,"Bandage":1,"PainKiller":1,"EnergyDrink":1,"JerryCan":1,"Bag_Lv1":1,"Bag_Lv2":1,"Bag_Lv3":1,"Helmet_Lv1":1,"Helmet_Lv2":1,"Helmet_Lv3":1,"Armor_Lv1":1,"Armor_Lv2":1,"Armor_Lv3":1,"RedZoneIsActive":true,"MultiplierRedZoneArea":1,"MultiplierRedZoneExplosionDensity":1,"MultiplierRedZoneStartTime":1.25,"MultiplierRedZoneEndTime":1.1,"MultiplierRedZoneExplosionDelay":1.1,"MultiplierRedZoneDuration":1,"Phase1_WarningDuration":300,"Phase1_ReleaseDuration":240,"Phase1_GasDamagePerSecond":0.4,"Phase1_RadiusRate":0.4,"Phase1_SpreadRatio":0.5,"Phase2_WarningDuration":120,"Phase2_ReleaseDuration":120,"Phase2_GasDamagePerSecond":0.6,"Phase2_RadiusRate":0.65,"Phase2_SpreadRatio":0.5,"Phase3_WarningDuration":90,"Phase3_ReleaseDuration":90,"Phase3_GasDamagePerSecond":0.8,"Phase3_RadiusRate":0.5,"Phase3_SpreadRatio":0.5,"Phase4_WarningDuration":90,"Phase4_ReleaseDuration":90,"Phase4_GasDamagePerSecond":1,"Phase4_RadiusRate":0.5,"Phase4_SpreadRatio":0.5,"Phase5_WarningDuration":90,"Phase5_ReleaseDuration":90,"Phase5_GasDamagePerSecond":3,"Phase5_RadiusRate":0.5,"Phase5_SpreadRatio":0.5,"Phase6_WarningDuration":60,"Phase6_ReleaseDuration":60,"Phase6_GasDamagePerSecond":5,"Phase6_RadiusRate":0.5,"Phase6_SpreadRatio":0.5,"Phase7_WarningDuration":60,"Phase7_ReleaseDuration":60,"Phase7_GasDamagePerSecond":7,"Phase7_RadiusRate":0.5,"Phase7_SpreadRatio":0.5,"Phase8_WarningDuration":60,"Phase8_ReleaseDuration":60,"Phase8_GasDamagePerSecond":9,"Phase8_RadiusRate":0.5,"Phase8_SpreadRatio":0.5,"ExecuteArgument":"{\"IsCustomGame\":true,\"MapName\":\"/Game/Maps/Erangel/Erangel_Main\",\"TeamCount\":1,\"MinPlayerCount\":100,\"MaxPlayerCount\":100,\"StringParameters\":[{\"First\":\"MatchStartType\",\"Second\":\"Airborne\"},{\"First\":\"VivoxServerUrl\",\"Second\":\"https://blhp.www.vivox.com/api2/\"},{\"First\":\"VivoxDomain\",\"Second\":\"blhp.vivox.com\"},{\"First\":\"VivoxAuthId\",\"Second\":\"battlegrounds-gs\"},{\"First\":\"VivoxAuthPwd\",\"Second\":\"epqlffldjs\"},{\"First\":\"VivoxAccessTokenExpirationTime\",\"Second\":\"600\"},{\"First\":\"VivoxIssuer\",\"Second\":\"tslvoicechat\"},{\"First\":\"VivoxKey\",\"Second\":\"Tltmxk4\"},{\"First\":\"VivoxProximalMaxRange\",\"Second\":\"3000\"},{\"First\":\"VivoxProximalClampingDistance\",\"Second\":\"500\"},{\"First\":\"VivoxProximalDistanceModel\",\"Second\":\"2\"},{\"First\":\"IsZombie\",\"Second\":\"false\"},{\"First\":\"MultiplierZombieToZombieDamage\",\"Second\":\"0\"},{\"First\":\"IsGroggyMode\",\"Second\":\"true\"},{\"First\":\"ReviveCastingTime\",\"Second\":\"10\"},{\"First\":\"MultiplierGroggyDamagePerSecond\",\"Second\":\"1\"},{\"First\":\"Weather\",\"Second\":\"Clear\"},{\"First\":\"MultiplierBlueZone\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZone\",\"Second\":\"undefined\"},{\"First\":\"BlueZoneCentralizationFactor\",\"Second\":\"0\"},{\"First\":\"MultiplierCarePackage\",\"Second\":\"5\"},{\"First\":\"ThingSpawnGroupRatio.0\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.1\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.2\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.4\",\"Second\":\"1\"},{\"First\":\"MultiplierPunchDamage\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.WSniperRifle\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WAssaultRifle\",\"Second\":\"2.9\"},{\"First\":\"ItemSpawnCategory.WHuntingRifle\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WLMG\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WSMG\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WShotGun\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WPistol\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WThrowWeapon\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.WMelee\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Wetc\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AScope\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AMagazine\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AMuzzle\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AStockforegrip\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Item\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Equip\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Costume\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Ammo\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.MedKit\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.FirstAid\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bandage\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.PainKiller\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.EnergyDrink\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.JerryCan\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv3\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv3\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv3\",\"Second\":\"1\"},{\"First\":\"RedZoneIsActive\",\"Second\":\"true\"},{\"First\":\"MultiplierRedZoneArea\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZoneExplosionDensity\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZoneStartTime\",\"Second\":\"1.25\"},{\"First\":\"MultiplierRedZoneEndTime\",\"Second\":\"1.1\"},{\"First\":\"MultiplierRedZoneExplosionDelay\",\"Second\":\"1.1\"},{\"First\":\"MultiplierRedZoneDuration\",\"Second\":\"1\"},{\"First\":\"Phase1.WarningDuration\",\"Second\":\"300\"},{\"First\":\"Phase1.ReleaseDuration\",\"Second\":\"240\"},{\"First\":\"Phase1.GasDamagePerSecond\",\"Second\":\"0.4\"},{\"First\":\"Phase1.RadiusRate\",\"Second\":\"0.4\"},{\"First\":\"Phase1.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase2.WarningDuration\",\"Second\":\"120\"},{\"First\":\"Phase2.ReleaseDuration\",\"Second\":\"120\"},{\"First\":\"Phase2.GasDamagePerSecond\",\"Second\":\"0.6\"},{\"First\":\"Phase2.RadiusRate\",\"Second\":\"0.65\"},{\"First\":\"Phase2.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase3.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase3.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase3.GasDamagePerSecond\",\"Second\":\"0.8\"},{\"First\":\"Phase3.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase3.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase4.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase4.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase4.GasDamagePerSecond\",\"Second\":\"1\"},{\"First\":\"Phase4.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase4.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase5.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase5.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase5.GasDamagePerSecond\",\"Second\":\"3\"},{\"First\":\"Phase5.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase5.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase6.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase6.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase6.GasDamagePerSecond\",\"Second\":\"5\"},{\"First\":\"Phase6.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase6.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase7.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase7.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase7.GasDamagePerSecond\",\"Second\":\"7\"},{\"First\":\"Phase7.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase7.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase8.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase8.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase8.GasDamagePerSecond\",\"Second\":\"9\"},{\"First\":\"Phase8.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase8.SpreadRatio\",\"Second\":\"0.5\"}]}","UserSlots":[]},"Players":[{"AccountId":"account.0595bc8962234f43b7198e2213fe5ae0","Nickname":"huoma033","PlayerNetId":"76561198421201791","IgnoreBattleEye":false},{"AccountId":"account.04fe1cffd0214f9b8c64b1aaaa43eb32","Nickname":"Acarabam","PlayerNetId":"76561198326429882","IgnoreBattleEye":false},{"AccountId":"account.77cf3f143a18480e83e3bd0958e576da","Nickname":"LA5LA5","PlayerNetId":"76561198123437698","IgnoreBattleEye":false},{"AccountId":"account.362833d7f147497f965b5f39e63c4cb1","Nickname":"Whyxxz","PlayerNetId":"76561198426988061","IgnoreBattleEye":false},{"AccountId":"account.a8392cb39fff496ab7655bd62422fbf4","Nickname":"LeeSin98k6","PlayerNetId":"76561198798164793","IgnoreBattleEye":false},{"AccountId":"account.e73c1013c3de43eda4eb4fe2abf8d62d","Nickname":"WJJ10068-","PlayerNetId":"76561198427914480","IgnoreBattleEye":false},{"AccountId":"account.d4584b873ab4405c8bcd82bc2332ab32","Nickname":"IngD","PlayerNetId":"76561198401191323","IgnoreBattleEye":false},{"AccountId":"account.c8382f068fe7453bbb8a77075cf21633","Nickname":"kimsohyun486","PlayerNetId":"76561198426732713","IgnoreBattleEye":false},{"AccountId":"account.f1dccad6186d422b9dd5f6a8f44b5379","Nickname":"Kobe_C","PlayerNetId":"76561198315944047","IgnoreBattleEye":false},{"AccountId":"account.d97a9d0dc25948f18348816373392734","Nickname":"xxVertigo","PlayerNetId":"76561198073428385","IgnoreBattleEye":false},null,null,null,null,null,null,null,null,null,null,{"AccountId":"account.1b5eb70a635242f1b5ab12bc1077d35f","Nickname":"Sunny_ZYX","PlayerNetId":"76561198074420028","IgnoreBattleEye":false},null,null,null,null,null,null,{"AccountId":"account.e636ffdc82ba44cfa71906b60a7f59af","Nickname":"HaiZeng","PlayerNetId":"76561198801552387","IgnoreBattleEye":false},null,null,null,null,{"AccountId":"account.4bf1bb5df6a445cfbd9fc804c0c8d876","Nickname":"piayonemancheng","PlayerNetId":"76561198138432695","IgnoreBattleEye":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"AccountId":"account.9a09e674557d4599a6b92bb5c2259ed0","Nickname":"Rycho_cc","PlayerNetId":"76561198424297250","IgnoreBattleEye":false},null,null,null,null,null,null,null,{"AccountId":"account.e3598cbd66c3401499c7d3202006fb7a","Nickname":"Dragon_Dc","PlayerNetId":"76561198429142646","IgnoreBattleEye":false},{"AccountId":"account.3682b298cfd54908a88290ee170ffce7","Nickname":"Dmoxuan","PlayerNetId":"76561198415013204","IgnoreBattleEye":false},{"AccountId":"account.e25c9b8baa1d4167a80aa45b8f1137ca","Nickname":"tuonvhai","PlayerNetId":"76561198422858266","IgnoreBattleEye":false},{"AccountId":"account.a917f2fe90244af4a29e995431a28a44","Nickname":"Mhy0119","PlayerNetId":"76561198414779442","IgnoreBattleEye":false},null,null,null,null,null,null,null,null,{"AccountId":"account.4ebe003e1e4c443fa72af79ad3577ea7","Nickname":"dawon77","PlayerNetId":"76561198164430178","IgnoreBattleEye":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"AccountId":"account.4b96d0726ba043168b84d6b9e87c57cc","Nickname":"PaNA6662","PlayerNetId":"76561198125651339","IgnoreBattleEye":false},null,null,null,null,null,null,null,null,null,null,null,{"AccountId":"account.8be6c5a0414f4c278324f78d8de07165","Nickname":"xiaolibuh","PlayerNetId":"76561198368618380","IgnoreBattleEye":false}],"Unassigns":[{"AccountId":"account.972e889d94534c5d9621bbbc1aff6a44","Nickname":"mulemake","PlayerNetId":"76561197972999988","IgnoreBattleEye":false}],"Bans":[],"Observers":[],"Teams":null}]')
                //     //clientSocket.send('[' + ServerCallback + ',null,true,{"CreationTime":"2018-01-31T04:41:10.3370098+00:00","StartTime":"0001-01-01T00:00:00","LastOwnerJoined":"2018-01-31T04:41:10.3370104+00:00","PartnerId":"zzVertigo","PartnerNickname":"zzVertigo","PartnerAccountId":"account.0595bc8962234f43b7198e2213fe5ae0","PartnerLevel":"","Stream":null,"State":"Waiting","Header":null,"PlayerCount":1,"Config":{"PartnerId":"zzVertigo","Title":"Vertigo\'s Custom Server #1","Passcord":"","MapId":"/Game/Maps/Erangel/Erangel_Main","LeagueId":0,"IsLeague":false,"TeamSize":1,"IsZombie":true,"MultiplierZombieToZombieDamage":0,"MaxPlayers":1,"WarmupTime":60,"Dbno":true,"ReviveCastingTime":10,"MultiplierGroggyDamagePerSecond":1,"SpecSolo":false,"FPCOnly":false,"MapOpt":"Clear","PlayzoneProgress":1,"RedzoneFreq":0,"BlueZoneCentralizationFactor":0,"CarePackageFreq":5,"Region":"NA Server","Lock":false,"GameId":4136,"StreamerEventMode":false,"Car":1,"Boat":1,"MultiplierPunchDamage":1,"WSniperRifle":3,"WAssaultRifle":2.9,"WHuntingRifle":3,"WLMG":3,"WSMG":3,"WShotGun":3,"WPistol":3,"WThrowWeapon":1,"WMelee":1,"Wetc":1,"AScope":1,"AMagazine":1,"AMuzzle":1,"AStockforegrip":1,"Item":1,"Equip":1,"Costume":1,"Ammo":1,"MedKit":1,"FirstAid":1,"Bandage":1,"PainKiller":1,"EnergyDrink":1,"JerryCan":1,"Bag_Lv1":1,"Bag_Lv2":1,"Bag_Lv3":1,"Helmet_Lv1":1,"Helmet_Lv2":1,"Helmet_Lv3":1,"Armor_Lv1":1,"Armor_Lv2":1,"Armor_Lv3":1,"RedZoneIsActive":true,"MultiplierRedZoneArea":1,"MultiplierRedZoneExplosionDensity":1,"MultiplierRedZoneStartTime":1.25,"MultiplierRedZoneEndTime":1.1,"MultiplierRedZoneExplosionDelay":1.1,"MultiplierRedZoneDuration":1,"Phase1_WarningDuration":300,"Phase1_ReleaseDuration":240,"Phase1_GasDamagePerSecond":0.4,"Phase1_RadiusRate":0.4,"Phase1_SpreadRatio":0.5,"Phase2_WarningDuration":120,"Phase2_ReleaseDuration":120,"Phase2_GasDamagePerSecond":0.6,"Phase2_RadiusRate":0.65,"Phase2_SpreadRatio":0.5,"Phase3_WarningDuration":90,"Phase3_ReleaseDuration":90,"Phase3_GasDamagePerSecond":0.8,"Phase3_RadiusRate":0.5,"Phase3_SpreadRatio":0.5,"Phase4_WarningDuration":90,"Phase4_ReleaseDuration":90,"Phase4_GasDamagePerSecond":1,"Phase4_RadiusRate":0.5,"Phase4_SpreadRatio":0.5,"Phase5_WarningDuration":90,"Phase5_ReleaseDuration":90,"Phase5_GasDamagePerSecond":3,"Phase5_RadiusRate":0.5,"Phase5_SpreadRatio":0.5,"Phase6_WarningDuration":60,"Phase6_ReleaseDuration":60,"Phase6_GasDamagePerSecond":5,"Phase6_RadiusRate":0.5,"Phase6_SpreadRatio":0.5,"Phase7_WarningDuration":60,"Phase7_ReleaseDuration":60,"Phase7_GasDamagePerSecond":7,"Phase7_RadiusRate":0.5,"Phase7_SpreadRatio":0.5,"Phase8_WarningDuration":60,"Phase8_ReleaseDuration":60,"Phase8_GasDamagePerSecond":9,"Phase8_RadiusRate":0.5,"Phase8_SpreadRatio":0.5,"ExecuteArgument":"{\"IsCustomGame\":true,\"MapName\":\"/Game/Maps/Erangel/Erangel_Main\",\"TeamCount\":1,\"MinPlayerCount\":100,\"MaxPlayerCount\":100,\"StringParameters\":[{\"First\":\"MatchStartType\",\"Second\":\"Airborne\"},{\"First\":\"VivoxServerUrl\",\"Second\":\"https://blhp.www.vivox.com/api2/\"},{\"First\":\"VivoxDomain\",\"Second\":\"blhp.vivox.com\"},{\"First\":\"VivoxAuthId\",\"Second\":\"battlegrounds-gs\"},{\"First\":\"VivoxAuthPwd\",\"Second\":\"epqlffldjs\"},{\"First\":\"VivoxAccessTokenExpirationTime\",\"Second\":\"600\"},{\"First\":\"VivoxIssuer\",\"Second\":\"tslvoicechat\"},{\"First\":\"VivoxKey\",\"Second\":\"Tltmxk4\"},{\"First\":\"VivoxProximalMaxRange\",\"Second\":\"3000\"},{\"First\":\"VivoxProximalClampingDistance\",\"Second\":\"500\"},{\"First\":\"VivoxProximalDistanceModel\",\"Second\":\"2\"},{\"First\":\"IsZombie\",\"Second\":\"false\"},{\"First\":\"MultiplierZombieToZombieDamage\",\"Second\":\"0\"},{\"First\":\"IsGroggyMode\",\"Second\":\"true\"},{\"First\":\"ReviveCastingTime\",\"Second\":\"10\"},{\"First\":\"MultiplierGroggyDamagePerSecond\",\"Second\":\"1\"},{\"First\":\"Weather\",\"Second\":\"Clear\"},{\"First\":\"MultiplierBlueZone\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZone\",\"Second\":\"undefined\"},{\"First\":\"BlueZoneCentralizationFactor\",\"Second\":\"0\"},{\"First\":\"MultiplierCarePackage\",\"Second\":\"5\"},{\"First\":\"ThingSpawnGroupRatio.0\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.1\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.2\",\"Second\":\"1\"},{\"First\":\"ThingSpawnGroupRatio.4\",\"Second\":\"1\"},{\"First\":\"MultiplierPunchDamage\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.WSniperRifle\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WAssaultRifle\",\"Second\":\"2.9\"},{\"First\":\"ItemSpawnCategory.WHuntingRifle\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WLMG\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WSMG\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WShotGun\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WPistol\",\"Second\":\"3\"},{\"First\":\"ItemSpawnCategory.WThrowWeapon\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.WMelee\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Wetc\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AScope\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AMagazine\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AMuzzle\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.AStockforegrip\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Item\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Equip\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Costume\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Ammo\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.MedKit\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.FirstAid\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bandage\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.PainKiller\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.EnergyDrink\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.JerryCan\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Bag_Lv3\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Helmet_Lv3\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv1\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv2\",\"Second\":\"1\"},{\"First\":\"ItemSpawnCategory.Armor_Lv3\",\"Second\":\"1\"},{\"First\":\"RedZoneIsActive\",\"Second\":\"true\"},{\"First\":\"MultiplierRedZoneArea\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZoneExplosionDensity\",\"Second\":\"1\"},{\"First\":\"MultiplierRedZoneStartTime\",\"Second\":\"1.25\"},{\"First\":\"MultiplierRedZoneEndTime\",\"Second\":\"1.1\"},{\"First\":\"MultiplierRedZoneExplosionDelay\",\"Second\":\"1.1\"},{\"First\":\"MultiplierRedZoneDuration\",\"Second\":\"1\"},{\"First\":\"Phase1.WarningDuration\",\"Second\":\"300\"},{\"First\":\"Phase1.ReleaseDuration\",\"Second\":\"240\"},{\"First\":\"Phase1.GasDamagePerSecond\",\"Second\":\"0.4\"},{\"First\":\"Phase1.RadiusRate\",\"Second\":\"0.4\"},{\"First\":\"Phase1.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase2.WarningDuration\",\"Second\":\"120\"},{\"First\":\"Phase2.ReleaseDuration\",\"Second\":\"120\"},{\"First\":\"Phase2.GasDamagePerSecond\",\"Second\":\"0.6\"},{\"First\":\"Phase2.RadiusRate\",\"Second\":\"0.65\"},{\"First\":\"Phase2.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase3.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase3.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase3.GasDamagePerSecond\",\"Second\":\"0.8\"},{\"First\":\"Phase3.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase3.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase4.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase4.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase4.GasDamagePerSecond\",\"Second\":\"1\"},{\"First\":\"Phase4.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase4.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase5.WarningDuration\",\"Second\":\"90\"},{\"First\":\"Phase5.ReleaseDuration\",\"Second\":\"90\"},{\"First\":\"Phase5.GasDamagePerSecond\",\"Second\":\"3\"},{\"First\":\"Phase5.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase5.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase6.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase6.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase6.GasDamagePerSecond\",\"Second\":\"5\"},{\"First\":\"Phase6.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase6.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase7.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase7.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase7.GasDamagePerSecond\",\"Second\":\"7\"},{\"First\":\"Phase7.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase7.SpreadRatio\",\"Second\":\"0.5\"},{\"First\":\"Phase8.WarningDuration\",\"Second\":\"60\"},{\"First\":\"Phase8.ReleaseDuration\",\"Second\":\"60\"},{\"First\":\"Phase8.GasDamagePerSecond\",\"Second\":\"9\"},{\"First\":\"Phase8.RadiusRate\",\"Second\":\"0.5\"},{\"First\":\"Phase8.SpreadRatio\",\"Second\":\"0.5\"}]}","UserSlots":[]},"Players":[],"Bans":[],"Observers":[],"Teams":null}]')
                // break;

                // case "customgame@CustomGameApi@JoinCustomGame":
                //     clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null}]')
                //     clientSocket.send('[0,null,"ClientApi","Invalidate","client.customgame","join",""]')
                // break;

                case "customgame@CustomGameApi@GetCustomGameList":
                    clientSocket.send('[' + ServerCallback + ',null,true,[{"CreationTime":"2017-12-22T12:51:09.3326585+00:00","StartTime":"2017-12-22T13:06:00.641386+00:00","PartnerId":"zzVertigo","AccountId":"account.e74b3915f7064efaa7a44b7579359b87","Nickname":null,"Title":"Vertigo\'s Custom Server #1","State":"Waiting","Region":"NA Server","Stream":null,"TeamSize":4,"Players":0,"MaxPlayers":1,"Passcord":null,"Lock":false,"GameSessionId":"match.bro.custom.Shadowfangkeep.krjp.normal.2017.12.22.5f9fa60c-f67d-4bc2-998e-45174d992adf","IsZombie":true,"MapId":"/Game/Maps/Erangel/Erangel_Main","MapOpt":"Clear_02","FPCOnly":false,"Dbno":true,"Redzone":true}, {"CreationTime":"2017-12-22T12:51:09.3326585+00:00","StartTime":"2017-12-22T13:06:00.641386+00:00","PartnerId":"zzVertigo","AccountId":"account.e74b3915f7064efaa7a44b7579359b87","Nickname":null,"Title":"Vertigo\'s Custom Server #2","State":"Waiting","Region":"NA Server","Stream":null,"TeamSize":4,"Players":0,"MaxPlayers":1,"Passcord":null,"Lock":false,"GameSessionId":"match.bro.custom.Shadowfangkeep.krjp.normal.2017.12.22.5f9fa60c-f67d-4bc2-998e-45174d992adf","IsZombie":true,"MapId":"/Game/Maps/Erangel/Erangel_Main","MapOpt":"Clear_02","FPCOnly":false,"Dbno":true,"Redzone":true}, {"CreationTime":"2017-12-22T12:51:09.3326585+00:00","StartTime":"2017-12-22T13:06:00.641386+00:00","PartnerId":"zzVertigo","AccountId":"account.e74b3915f7064efaa7a44b7579359b87","Nickname":null,"Title":"Vertigo\'s Custom Server #3","State":"Waiting","Region":"NA Server","Stream":null,"TeamSize":4,"Players":0,"MaxPlayers":1,"Passcord":null,"Lock":false,"GameSessionId":"match.bro.custom.Shadowfangkeep.krjp.normal.2017.12.22.5f9fa60c-f67d-4bc2-998e-45174d992adf","IsZombie":true,"MapId":"/Game/Maps/Erangel/Erangel_Main","MapOpt":"Clear_02","FPCOnly":false,"Dbno":true,"Redzone":true}]]')
                break;

                case "GetBroLeaderboard":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":{"Region":"na","Division":"division.bro.official.2018-01.na.solo","Domain":"Rating","Leaders":[],"User":{"AccountId":"account.d97a9d0dc25948f18348816373392734","Nickname":"zzVertigo","AvatarUrl":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/58/58996926e5392cfeafbc867571cb7fc75fb5ecba.jpg","Rank":0,"PercentRank":"0","Rating":0,"WinPoints":0,"KillPoints":0,"Playtime":0,"Wins":0,"Top10s":0,"WinRatio":0,"Kills":0,"MostKills":0,"Kdr":0}}}]')
                break;

                case "Ping":
                    // Server sends nothing in return :thinking:
                break;

                case "GetAnnouncement":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":[]}]')
                break;

                case "GetBroUserStatesByOrigin":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":[]}]')
                break;

                case "RequestMatch":
                    clientSocket.send('[' + ServerCallback + ',null,false,{"Error":"CM:IN_MAINTENANCE"}]')
                    //clientSocket.send('[0,null,"ClientApi","Invalidate","client.match",null,null]')
                break;

                case "GetStoreItems":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":[{"ItemDescId":"itemdesc.10000000","PartDescId":"partdesc.create","Name":"RANDOM CRATE","Desc":"","PresetId":"Item_Box_Root","Quality":"basic","Count":0,"BuyPrice":700,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":6,"InEquip":false,"Doubling":true},{"ItemDescId":"itemdesc.10000002","PartDescId":"partdesc.create","Name":"RANDOM CRATE","Desc":"","PresetId":"Item_Box_Root_NonSteam","Quality":"basic","Count":0,"BuyPrice":700,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":6,"InEquip":false,"Doubling":true}]}]')
                break;

                case "GetUserRecord":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":{"Season":"2018-01","Division":"division.bro.official.2018-01.na.solo","Region":"na","Match":"solo","AccountId":"account.d97a9d0dc25948f18348816373392734","Nickname":"xxVertigo","AvatarUrl":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/58/58996926e5392cfeafbc867571cb7fc75fb5ecba.jpg","Ranks":null,"PercentRanks":{"Rating":"35.0362","WinPoints":"31.1945","KillPoints":"68.1367"},"Records":{"Rating":"1266.77","BestRating":"1313.881","RoundsPlayed":"10","TimeSurvived":"8260.783","LongestTimeSurvived":"1712.769","WinPoints":"1065.602","DailyWins":"0","WeeklyWins":"0","Wins":"0","Top10s":"2","Losses":"10","WinRatio":"0","Top10Ratio":"0.2","WinTop10Ratio":"0","KillPoints":"1005.838","Days":"7","DailyKills":"0","WeeklyKills":"0","RoundMostKills":"2","Kills":"3","MaxKillStreaks":"1","Assists":"0","KillDeathRatio":"0.3","HeadshotKills":"0","HeadshotKillRatio":"0","VehicleDestroys":"0","RoadKills":"0","WalkDistance":"18305.1","RideDistance":"5459.924","MoveDistance":"23765.02","AvgWalkDistance":"1830.51","AvgRideDistance":"545.9924","AvgMoveDistance":"2376.502","LongestKill":"212.9656","Suicides":"0","TeamKills":"0","MostSurvivalTime":"1712.769","AvgSurvivalTime":"826.0783","Heals":"0","Boosts":"2","DamageDealt":"335.5399","WeaponAcquired":"37","DBNOs":"0","Revives":"0"}}}]')
                break;

                case "GetInventory":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":{"Items":[{"ItemDescId":"itemdesc.11010028","PartDescId":"partdesc.torso","Name":"Dirty Long-sleeved T-shirt","Desc":"","PresetId":"Item_Body_G_04","Quality":"common","Count":1,"BuyPrice":0,"SellPrice":30,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21010001","PartDescId":"partdesc.torso","Name":"T-shirt (White)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Body_F_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21010002","PartDescId":"partdesc.torso","Name":"T-shirt (GREY)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Body_F_04","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21020001","PartDescId":"partdesc.legs","Name":"Combat Pants (khaki)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Legs_C_02","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false},{"ItemDescId":"itemdesc.21020002","PartDescId":"partdesc.legs","Name":"Combat Pants (Brown)","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Legs_C_03","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21030002","PartDescId":"partdesc.feet","Name":"Hi-top Trainers","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Feet_E_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.21090001","PartDescId":"partdesc.belt","Name":"Utility Belt","Desc":"Basic costume. Unable to sell.","PresetId":"Item_Belt_D_01","Quality":"basic","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":true,"Doubling":false},{"ItemDescId":"itemdesc.31010013","PartDescId":"partdesc.torso","Name":"PIONEER SHIRT","Desc":"","PresetId":"Item_Body_EA_01","Quality":"event","Count":1,"BuyPrice":0,"SellPrice":0,"PriceInCents":0,"WeeklyPurchaseLimit":0,"InEquip":false,"Doubling":false}],"Equips":[[{"ItemDescId":"itemdesc.21010002","PartDescId":"partdesc.torso","PresetId":"Item_Body_F_04"},{"ItemDescId":"itemdesc.21020002","PartDescId":"partdesc.legs","PresetId":"Item_Legs_C_03"},{"ItemDescId":"itemdesc.21030002","PartDescId":"partdesc.feet","PresetId":"Item_Feet_E_01"},{"ItemDescId":null,"PartDescId":"partdesc.hands","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.outer","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.head","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.mask","PresetId":null},{"ItemDescId":null,"PartDescId":"partdesc.eyes","PresetId":null},{"ItemDescId":"itemdesc.21090001","PartDescId":"partdesc.belt","PresetId":"Item_Belt_D_01"}]],"Currencies":[{"CurrencyId":"currencydesc.bp","Amount":999999}],"History":[{"ItemDescId":"itemdesc.10000000","Count":1}]}}]')
                break;

                case "GetPartyData":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":null}]')
                break;

                case "GetOpenGameInfo":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":{"CurrentSeason":null,"IsSeasonOff":false,"MatchDescsByRegionAndPartyType":{"as":{"solo":"division.bro.official.2018-01.as.solo","duo":"division.bro.official.2018-01.as.duo","squad":"division.bro.official.2018-01.as.squad","solo-fpp":"division.bro.official.2018-01.as.solo-fpp","duo-fpp":"division.bro.official.2018-01.as.duo-fpp","squad-fpp":"division.bro.official.2018-01.as.squad-fpp"},"eu":{"solo":"division.bro.official.2018-01.eu.solo","duo":"division.bro.official.2018-01.eu.duo","squad":"division.bro.official.2018-01.eu.squad","solo-fpp":"division.bro.official.2018-01.eu.solo-fpp","duo-fpp":"division.bro.official.2018-01.eu.duo-fpp","squad-fpp":"division.bro.official.2018-01.eu.squad-fpp"},"oc":{"solo":"division.bro.official.2018-01.oc.solo","duo":"division.bro.official.2018-01.oc.duo","squad":"division.bro.official.2018-01.oc.squad","solo-fpp":"division.bro.official.2018-01.oc.solo-fpp","duo-fpp":"division.bro.official.2018-01.oc.duo-fpp","squad-fpp":"division.bro.official.2018-01.oc.squad-fpp"},"na":{"solo":"division.bro.official.2018-01.na.solo","duo":"division.bro.official.2018-01.na.duo","squad":"division.bro.official.2018-01.na.squad","solo-fpp":"division.bro.official.2018-01.na.solo-fpp","duo-fpp":"division.bro.official.2018-01.na.duo-fpp","squad-fpp":"division.bro.official.2018-01.na.squad-fpp"},"sa":{"solo":"division.bro.official.2018-01.sa.solo","duo":"division.bro.official.2018-01.sa.duo","squad":"division.bro.official.2018-01.sa.squad","solo-fpp":"division.bro.official.2018-01.sa.solo-fpp","squad-fpp":"division.bro.official.2018-01.sa.squad-fpp"},"sea":{"solo":"division.bro.official.2018-01.sea.solo","duo":"division.bro.official.2018-01.sea.duo","squad":"division.bro.official.2018-01.sea.squad","squad-fpp":"division.bro.official.2018-01.sea.squad-fpp"},"krjp":{"solo":"division.bro.official.2018-01.krjp.solo","duo":"division.bro.official.2018-01.krjp.duo","squad":"division.bro.official.2018-01.krjp.squad"}},"Options":null}}]')
                break;

                case "GetActivatedEvents":
                    clientSocket.send('[' + ServerCallback + ',null,true,[]]')
                break;

                case "GetUserMatchState":
                    clientSocket.send('[' + ServerCallback + ',null,true,{"Error":null,"Result":0}]')
                break;

                default:
                    console.log('Unknown Method Received!')
                    console.log('Client Callback - ' + ClientCallback + ' (' + Method + ')\n')
                    //console.log('Arguments - ' + Arguments + '\n\n')
                break;
            }
        });

        clientSocket.on('close', () => {
            console.log('Game client closed connection');
        });
    }
}

module.exports = GameServer;
