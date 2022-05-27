import type { ILogger } from "../types/models/spt/utils/ILogger";
import type { DatabaseServer } from "../types/servers/DatabaseServer";
import { Other } from "./other";
import { inject, injectable } from "tsyringe";
import { AIOConfigHandler } from "./AIOConfigHandler";
import { BaseClasses } from "../types/models/enums/BaseClasses";

@injectable()
export class Items
{
    constructor(
        @inject("WinstonLogger") private logger: ILogger,
        @inject("AIOConfigHandler") private configHandler: AIOConfigHandler,
        @inject("DatabaseServer") private database: DatabaseServer,
        @inject("AIOOther") private other: Other
    )
    {}

    public applyChanges(): void
    {
        const items = this.database.getTables().templates.items;

        for (const id in items)
        {
            const base = items[id];

            if (!this.other.isThisIDaMod([id]))
            {
                //Examine all items
                if (!this.configHandler.getConfig().items.allExaminedItems)
                {
                    this.editSimpleItemData(id, "ExaminedByDefault", true);
                }

                // Weight Change, only Multiple possible
                if (typeof this.configHandler.getConfig().items.weightChanges !== "boolean" && typeof this.configHandler.getConfig().items.weightChanges === "number" && this.configHandler.getConfig().items.weightChanges <= 0)
                {
                    this.editSimpleItemData(id, "Weight", (base._props.Weight * <number> this.configHandler.getConfig().items.weightChanges));
                }

                if (this.configHandler.getConfig().items.removeAllGearPenalties)
                {
                    if (base._props.mousePenalty)
                    {
                        this.editSimpleItemData(id, "mousePenalty", 0);
                    }

                    if (base._props.weaponErgonomicPenalty)
                    {
                        this.editSimpleItemData(id, "weaponErgonomicPenalty", 0);
                    }

                    if (base._props.speedPenaltyPercent)
                    {
                        this.editSimpleItemData(id, "speedPenaltyPercent", 0);
                    }
                }

                if (this.configHandler.getConfig().items.removeItemDurabilityBurn && base._props.DurabilityBurnModificator)
                {
                    this.editSimpleItemData(id, "DurabilityBurnModificator", 0);
                }

                if (this.configHandler.getConfig().items.removeBulletWeaponDurabilityDamage && base._props.Deterioration)
                {
                    this.editSimpleItemData(id, "Deterioration", 0);
                }

                if (this.configHandler.getConfig().items.removeWeaponPresetRestriction && !base._props.CanRequireOnRagfair && items[items[base._parent]._parent]._id === "5422acb9af1c889c16000029")
                {
                    this.editSimpleItemData(id, "CanRequireOnRagfair", "true");
                }

                if (this.configHandler.getConfig().items.stackableBarters.activated)
                {
                    switch (base._parent)
                    {
                        case BaseClasses.BATTERY:
                            if (this.configHandler.getConfig().items.stackableBarters.battery > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.battery);
                            }
                            break;
                        case BaseClasses.BUILDING_MATERIAL:
                            if (this.configHandler.getConfig().items.stackableBarters.buildingMaterials > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.buildingMaterials);
                            }
                            break;
                        case BaseClasses.ELECTRONICS:
                            if (this.configHandler.getConfig().items.stackableBarters.electronics > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.electronics);
                            }
                            break;
                        case BaseClasses.HOUSEHOLD_GOODS:
                            if (this.configHandler.getConfig().items.stackableBarters.householdGoods > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.householdGoods);
                            }
                            break;
                        case BaseClasses.JEWELRY:
                            if (this.configHandler.getConfig().items.stackableBarters.jewelry > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.jewelry);
                            }
                            break;
                        case BaseClasses.MEDICAL_SUPPLIES:
                            if (this.configHandler.getConfig().items.stackableBarters.medicalSupplies > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.medicalSupplies);
                            }
                            break;
                        case BaseClasses.LUBRICANT:
                            if (this.configHandler.getConfig().items.stackableBarters.lubricant > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.lubricant);
                            }
                            break;
                        case BaseClasses.TOOL:
                            if (this.configHandler.getConfig().items.stackableBarters.tools > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.tools);
                            }
                            break;
                        case BaseClasses.OTHER:
                            if (this.configHandler.getConfig().items.stackableBarters.other > 1)
                            {
                                this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.stackableBarters.other);
                            }
                            break;
                    }
                }

                //Change ammo stacks
                if (typeof this.configHandler.getConfig().items.moreStack == "number")
                {
                    if (base._name.includes("patron") && !base._name.includes("40x46"))
                    {
                        this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.moreStack);
                    }
                }

                //Change money stacks
                if (typeof this.configHandler.getConfig().items.forceMoneyStack == "number" && base._parent === BaseClasses.MONEY)
                {
                    this.editSimpleItemData(id, "StackMaxSize", this.configHandler.getConfig().items.forceMoneyStack);
                }

                //Allow armored rigs with armors
                if (this.configHandler.getConfig().items.equipRigsWithArmors)
                {
                    this.editSimpleItemData(id, "BlocksArmorVest", false);
                }

                //Remove filters
                if (this.configHandler.getConfig().items.removeSecureContainerFilters && base._parent === BaseClasses.MOD_CONTAINER && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                if (this.configHandler.getConfig().items.removeBackpacksRestrictions &&  base._parent === BaseClasses.BACKPACK && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                if (this.configHandler.getConfig().items.removeContainersRestrictions && base._parent === BaseClasses.SIMPLE_CONTAINER && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                //Change items experience gain
                if (typeof this.configHandler.getConfig().items.increaseLootExp == "number" && base._props.LootExperience !== undefined) 
                {
                    const calculation = Math.round((base._props.LootExperience + ((<number> this.configHandler.getConfig().items.increaseLootExp / 100) * base._props.LootExperience)));
                    this.editSimpleItemData(id, "LootExperience", calculation);
                }

                if (typeof this.configHandler.getConfig().items.increaseExamineExp == "number" && base._props.ExamineExperience !== undefined) 
                {
                    const calculation = Math.round((base._props.ExamineExperience + ((<number> this.configHandler.getConfig().items.increaseExamineExp / 100) * base._props.ExamineExperience)));
                    this.editSimpleItemData(id, "ExamineExperience", calculation);
                }

                if (this.configHandler.getConfig().items.removeKeyUsageNumber && base._parent === BaseClasses.KEY_MECHANICAL || base._parent === BaseClasses.KEYCARD) 
                {
                    base._props.MaximumNumberOfUsage = 0;
                }

                //Change weapons parts moddability
                if (this.configHandler.getConfig().items.inRaidModdable) 
                {
                    if (base._props.RaidModdable) 
                    {
                        this.editSimpleItemData(id, "RaidModdable", true);
                    }

                    if (base._props.ToolModdable) 
                    {
                        this.editSimpleItemData(id, "ToolModdable", true);
                    }

                    if (base._props.Slots) 
                    {
                        for (const k in base._props.Slots) 
                        {
                            if (!base._props.Slots[k]._required) 
                            {
                                base._props.Slots[k]._required = false;
                            }
                        }
                    }
                }
            }

            //Weapons malfunctions
            if (this.configHandler.getConfig().items.weaponMalfunctions.overheat && base._props.AllowOverheat)
            {
                base._props.AllowOverheat = false;
            }

            if (this.configHandler.getConfig().items.weaponMalfunctions.jam && base._props.AllowJam)
            {
                base._props.AllowJam = false;
            }

            if (this.configHandler.getConfig().items.weaponMalfunctions.feed && base._props.AllowFeed)
            {
                base._props.AllowFeed = false;
            }

            if (this.configHandler.getConfig().items.weaponMalfunctions.misfire && base._props.AllowMisfire)
            {
                base._props.AllowMisfire = false;
            }

            if (this.configHandler.getConfig().items.weaponMalfunctions.slide && base._props.AllowSlide)
            {
                base._props.AllowSlide = false;
            }

            //Weapons durabilities min-max
            if (this.configHandler.getConfig().items.weaponDurabilities.minimumSpawnDurability != false && typeof this.configHandler.getConfig().items.weaponDurabilities.minimumSpawnDurability === "number" && base._props.durabSpawnMin)
            {
                base._props.durabSpawnMin = <number> this.configHandler.getConfig().items.weaponDurabilities.minimumSpawnDurability;
            }
            if (this.configHandler.getConfig().items.weaponDurabilities.maximumSpawnDurability != false && typeof this.configHandler.getConfig().items.weaponDurabilities.maximumSpawnDurability === "number" && base._props.durabSpawnMax)
            {
                base._props.durabSpawnMax = <number> this.configHandler.getConfig().items.weaponDurabilities.maximumSpawnDurability;
            }
        }

        if (this.configHandler.getConfig().other.preWipeEvents.makeObdolbosPowerful) 
        {
            const obdolbosBuff = [
                {
                    "BuffType": "StaminaRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 0.5,
                    "AbsoluteValue": true,
                    "SkillName": ""
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 10,
                    "AbsoluteValue": true,
                    "SkillName": "Endurance"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 10,
                    "AbsoluteValue": true,
                    "SkillName": "Strength"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 20,
                    "AbsoluteValue": true,
                    "SkillName": "StressResistance"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 20,
                    "AbsoluteValue": true,
                    "SkillName": "Charisma"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": -20,
                    "AbsoluteValue": true,
                    "SkillName": "Memory"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": -20,
                    "AbsoluteValue": true,
                    "SkillName": "Intellect"
                },
                {
                    "BuffType": "SkillRate",
                    "Chance": 1,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": -20,
                    "AbsoluteValue": true,
                    "SkillName": "Attention"
                },
                {
                    "BuffType": "Pain",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 0,
                    "AbsoluteValue": false,
                    "SkillName": ""
                },
                {
                    "BuffType": "StomachBloodloss",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 0,
                    "AbsoluteValue": false,
                    "SkillName": ""
                },
                {
                    "BuffType": "HydrationRate",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": -0.05,
                    "AbsoluteValue": true,
                    "SkillName": ""
                },
                {
                    "BuffType": "EnergyRate",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": -0.05,
                    "AbsoluteValue": true,
                    "SkillName": ""
                },
                {
                    "BuffType": "DamageModifier",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 0.2,
                    "AbsoluteValue": false,
                    "SkillName": ""
                },
                {
                    "BuffType": "QuantumTunnelling",
                    "Chance": 0.25,
                    "Delay": 1,
                    "Duration": 1800,
                    "Value": 0,
                    "AbsoluteValue": false,
                    "SkillName": ""
                }]

            this.database.getTables().globals.config.Health.Effects.Stimulator.Buffs.Buffs_Obdolbos = obdolbosBuff;
        }


        //Individual items proprety changes
        if (this.configHandler.getConfig().items.changeIndividualItemProperty.activated) 
        {
            //Edit item properties
            if (this.configHandler.getConfig().items.changeIndividualItemProperty.ItemList !== {}) 
            {
                for (const k in this.configHandler.getConfig().items.changeIndividualItemProperty.ItemList) 
                {
                    if (k === "__REPLACEMEBYITEMID__") 
                    {
                        this.logger.error("AllinOne Mod: " + k + " : IS NOT AN ITEMID");
                    } 
                    else 
                    {
                        for (const property in this.configHandler.getConfig().items.changeIndividualItemProperty.ItemList[k]) 
                        {
                            const value = this.configHandler.getConfig().items.changeIndividualItemProperty.ItemList[k][property];
                            this.editSimpleItemData(k, property, value);
                        }
                    }
                }
            }
        }
    }

    private editSimpleItemData(id: string, data: string, value: any): void
    {
        const items = this.database.getTables().templates.items;
        items[id]._props[data] = value;
    }
}