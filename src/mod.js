"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
// New trader settings
const baseJson = __importStar(require("../db/base.json"));
const traderHelpers_1 = require("./traderHelpers");
const fluentTraderAssortCreator_1 = require("./fluentTraderAssortCreator");
const Money_1 = require("C:/snapshot/project/obj/models/enums/Money");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
class SampleTrader {
    constructor() {
        this.mod = "IgorTrader"; // Set name of mod so we can log it to console later
    }
    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    preAkiLoad(container) {
        // Get a logger
        this.logger = container.resolve("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);
        // Get SPT code/data we need later
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const imageRouter = container.resolve("ImageRouter");
        const hashUtil = container.resolve("HashUtil");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const ragfairConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHelper = new traderHelpers_1.TraderHelper();
        this.fluentTraderAssortHeper = new fluentTraderAssortCreator_1.FluentAssortConstructor(hashUtil, this.logger);
        this.traderHelper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "igortrader.jpg");
        this.traderHelper.setTraderUpdateTime(traderConfig, baseJson, 3600);
        // Add trader to trader enum
        Traders_1.Traders[baseJson._id] = baseJson._id;
        // Add trader to flea market
        ragfairConfig.traders[baseJson._id] = true;
        this.logger.debug(`[${this.mod}] preAki Loaded`);
    }
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    postDBLoad(container) {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        // Resolve SPT classes we'll use
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const jsonUtil = container.resolve("JsonUtil");
        // Get a reference to the database tables
        const tables = databaseServer.getTables();
        // Add new trader to the trader dictionary in DatabaseServer - has no assorts (items) yet
        this.traderHelper.addTraderToDb(baseJson, tables, jsonUtil);
        // Add TNT Brick
        this.fluentTraderAssortHeper.createSingleAssortItem("60391b0fb847c71012789415")
            .addStackCount(20)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 19999)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add Zarya
        this.fluentTraderAssortHeper.createSingleAssortItem("5a0c27731526d80618476ac4")
            .addStackCount(200)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 6999)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add Model 7290
        this.fluentTraderAssortHeper.createSingleAssortItem("619256e5f8af2c1a4e1f5d92")
            .addStackCount(100)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 9750)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add RDG-5
        this.fluentTraderAssortHeper.createSingleAssortItem("5448be9a4bdc2dfd2f8b456a")
            .addStackCount(75)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add F1
        this.fluentTraderAssortHeper.createSingleAssortItem("5710c24ad2720bc3458b45a3")
            .addStackCount(35)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 12000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add M67
        this.fluentTraderAssortHeper.createSingleAssortItem("58d3db5386f77426186285a0")
            .addStackCount(20)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 13500)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add Grenade Case
        this.fluentTraderAssortHeper.createSingleAssortItem("5e2af55f86f7746d4159f07c")
            .addStackCount(5)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 400000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add Fuze
        this.fluentTraderAssortHeper.createSingleAssortItem("5e2af51086f7746d3f3c3402")
            .addStackCount(300)
            .addBuyRestriction(12)
            .addMoneyCost(Money_1.Money.ROUBLES, 12475)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add VOG-17
        this.fluentTraderAssortHeper.createSingleAssortItem("5e32f56fcb6d5863cc5e5ee4")
            .addStackCount(10)
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 20000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add VOG-25
        this.fluentTraderAssortHeper.createSingleAssortItem("5e340dcdcb6d5863cc5e5efb")
            .addStackCount(10)
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 27899)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add some singular items to trader (items without sub-items e.g. milk/bandage)
        //this.traderHeper.addSingleItemsToTrader(tables, baseJson._id);
        // Add more complex items to trader (items with sub-items, e.g. guns)
        //this.traderHeper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);
        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHelper.addTraderToLocales(baseJson, tables, baseJson.name, "Igor", baseJson.nickname, baseJson.location, "Former military demolition expert renowned for his expertise in all things explosive. Igor's arsenal of fragmentation grenades and grenade launchers is unmatched, making him the go-to source for the most devastating ordnance in Tarkov's unforgiving battles.");
        this.logger.debug(`[${this.mod}] postDb Loaded`);
    }
}
module.exports = { mod: new SampleTrader() };
