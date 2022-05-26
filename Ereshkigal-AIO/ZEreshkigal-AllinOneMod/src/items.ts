import type { ILogger } from "../types/models/spt/utils/ILogger";
import { DatabaseServer } from "../types/servers/DatabaseServer";
import { Other } from "./other";
import { ItemHelper } from "../types/helpers/ItemHelper";
import { IConfig } from "../models/IConfig";

export class Items
{
    constructor(
        private logger: ILogger,
        private config: IConfig,
        private database: DatabaseServer,
        private other: Other
        )
    {}

    public ApplyChanges(): void
    {
        const items = this.database.getTables().templates.items;

        for (const id in items)
        {
            let base = items[id];

            if (!this.other.IsThisIDaMod([id]))
            {
                //Examine all items
                if (!this.config.items.allExaminedItems)
                {
                    this.EditSimpleItemData(id, "ExaminedByDefault", true);
                }

                // Weight Change, only Multiple possible
                if (typeof this.config.items.weightChanges !== "boolean" && typeof this.config.items.weightChanges === "number" && this.config.items.weightChanges <= 0)
                {
                    this.EditSimpleItemData(id, "Weight", (base._props.Weight * this.config.items.weightChanges));
                }

                if (this.config.items.removeAllGearPenalties)
                {
                    if (base._props.mousePenalty)
                    {
                        this.EditSimpleItemData(id, "mousePenalty", 0);
                    }

                    if (base._props.weaponErgonomicPenalty)
                    {
                        this.EditSimpleItemData(id, "weaponErgonomicPenalty", 0);
                    }

                    if (base._props.speedPenaltyPercent)
                    {
                        this.EditSimpleItemData(id, "speedPenaltyPercent", 0);
                    }
                }

                if (this.config.items.removeItemDurabilityBurn && base._props.DurabilityBurnModificator)
                {
                    this.EditSimpleItemData(id, "DurabilityBurnModificator", 0);
                }

                if (this.config.items.removeBulletWeaponDurabilityDamage && base._props.Deterioration)
                {
                    this.EditSimpleItemData(id, "Deterioration", 0);
                }

                if (this.config.items.removeWeaponPresetRestriction && !base._props.CanRequireOnRagfair && items[items[base._parent]._parent]._id === ItemHelper.BaseClasses.WEAPON)
                {
                    this.EditSimpleItemData(id, "CanRequireOnRagfair", "true");
                }

                if (this.config.items.stackableBarters.activated)
                {
                    switch (base._parent)
                    {
                        case ItemHelper.BaseClasses.BATTERY:
                            if (this.config.items.stackableBarters.battery > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.battery);
                            }
                            break;
                        case ItemHelper.BaseClasses.BUILDING_MATERIAL:
                            if (this.config.items.stackableBarters.buildingMaterials > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.buildingMaterials);
                            }
                            break;
                        case ItemHelper.BaseClasses.ELECTRONICS:
                            if (this.config.items.stackableBarters.electronics > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.electronics);
                            }
                            break;
                        case ItemHelper.BaseClasses.HOUSEHOLD_GOODS:
                            if (this.config.items.stackableBarters.householdGoods > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.householdGoods);
                            }
                            break;
                        case ItemHelper.BaseClasses.JEWELRY:
                            if (this.config.items.stackableBarters.jewelry > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.jewelry);
                            }
                            break;
                        case ItemHelper.BaseClasses.MEDICAL_SUPPLIES:
                            if (this.config.items.stackableBarters.medicalSupplies > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.medicalSupplies);
                            }
                            break;
                        case ItemHelper.BaseClasses.LUBRICANT:
                            if (this.config.items.stackableBarters.flammable > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.flammable);
                            }
                            break;
                        case ItemHelper.BaseClasses.TOOL:
                            if (this.config.items.stackableBarters.tools > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.tools);
                            }
                            break;
                        case ItemHelper.BaseClasses.OTHER:
                            if (this.config.items.stackableBarters.other > 1)
                            {
                                this.EditSimpleItemData(id, "StackMaxSize", this.config.items.stackableBarters.other);
                            }
                            break;
                    }
                }

                //Change ammo stacks
                if (typeof this.config.items.moreStack == "number")
                {
                    if (base._name.includes("patron") && !base._name.includes("40x46"))
                    {
                        this.EditSimpleItemData(id, "StackMaxSize", this.config.items.moreStack);
                    }
                }

                //Change money stacks
                if (typeof this.config.items.forceMoneyStack == "number" && base._parent === ItemHelper.BaseClasses.MONEY)
                {
                    this.EditSimpleItemData(id, "StackMaxSize", this.config.items.forceMoneyStack);
                }

                //Allow armored rigs with armors
                if (this.config.items.equipRigsWithArmors)
                {
                    this.EditSimpleItemData(id, "BlocksArmorVest", false);
                }

                //Remove filters
                if (this.config.items.removeSecureContainerFilters && base._parent === ItemHelper.BaseClasses.MOD_CONTAINER && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                if (this.config.items.removeBackpacksRestrictions &&  base._parent === ItemHelper.BaseClasses.BACKPACK && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                if (this.config.items.removeContainersRestrictions && base._parent === ItemHelper.BaseClasses.SIMPLE_CONTAINER && base._props.Grids[0]._props.filters.length > 0)
                {
                    base._props.Grids[0]._props.filters = [];
                }

                //Change items experience gain
                if (typeof this.config.items.increaseLootExp == "number" && base._props.LootExperience !== undefined) 
                {
                    let calculation = Math.round((base._props.LootExperience + ((this.config.items.increaseLootExp / 100) * base._props.LootExperience)));
                    this.EditSimpleItemData(id, "LootExperience", calculation);
                }

                if (typeof this.config.items.increaseExamineExp == "number" && base._props.ExamineExperience !== undefined) 
                {
                    let calculation = Math.round((base._props.ExamineExperience + ((this.config.items.increaseExamineExp / 100) * base._props.ExamineExperience)));
                    this.EditSimpleItemData(id, "ExamineExperience", calculation);
                }

                if (this.config.items.removeKeyUsageNumber && base._parent === ItemHelper.BaseClasses.KEY_MECHANICAL || base._parent === ItemHelper.BaseClasses.KEYCARD) 
                {
                    base._props.MaximumNumberOfUsage = 0;
                }

                //Change weapons parts moddability
                if (this.config.items.inRaidModdable) 
                {
                    if (base._props.RaidModdable) 
                    {
                        this.EditSimpleItemData(id, "RaidModdable", true);
                    }

                    if (base._props.ToolModdable) 
                    {
                        this.EditSimpleItemData(id, "ToolModdable", true);
                    }

                    if (base._props.Slots) 
                    {
                        for (let k in base._props.Slots) 
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
            if (this.config.items.weaponMalfunctions.overheat && base._props.AllowOverheat)
            {
                base._props.AllowOverheat = false;
            }

            if (this.config.items.weaponMalfunctions.jam && base._props.AllowJam)
            {
                base._props.AllowJam = false;
            }

            if (this.config.items.weaponMalfunctions.feed && base._props.AllowFeed)
            {
                base._props.AllowFeed = false;
            }

            if (this.config.items.weaponMalfunctions.misfire && base._props.AllowMisfire)
            {
                base._props.AllowMisfire = false;
            }

            if (this.config.items.weaponMalfunctions.slide && base._props.AllowSlide)
            {
                base._props.AllowSlide = false;
            }

            //Weapons durabilities min-max
            if (this.config.items.weaponDurabilities.minimumSpawnDurability != false && typeof this.config.items.weaponDurabilities.minimumSpawnDurability === "number" && base._props.durabSpawnMin)
            {
                base._props.durabSpawnMin = this.config.items.weaponDurabilities.minimumSpawnDurability;
            }
            if (this.config.items.weaponDurabilities.maximumSpawnDurability != false && typeof this.config.items.weaponDurabilities.maximumSpawnDurability === "number" && base._props.durabSpawnMax)
            {
                    base._props.durabSpawnMax = this.config.items.weaponDurabilities.maximumSpawnDurability;
            }
        }

        if (this.config.other.preWipeEvents.makeObdolbosPowerful) 
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
        if (this.config.items.changeIndividualItemProperty.activated) 
        {
            //Edit item properties
            if (this.config.items.changeIndividualItemProperty.ItemList !== {}) 
            {
                for (let k in this.config.items.changeIndividualItemProperty.ItemList) 
                {
                    if (k === "__REPLACEMEBYITEMID__") 
                    {
                        this.logger.error("AllinOne Mod: " + k + " : IS NOT AN ITEMID");
                    } 
                    else 
                    {
                        for (let property in this.config.items.changeIndividualItemProperty.ItemList[k]) 
                        {
                            let value = this.config.items.changeIndividualItemProperty.ItemList[k][property];
                            this.EditSimpleItemData(k, property, value);
                        }
                    }
                }
            }
        }
    }

    private EditSimpleItemData(id: string, data: string, value: any): void
    {
        const items = this.database.getTables().templates.items;
        items[id]._props[data] = value;
    }
}