import type { DependencyContainer } from "tsyringe";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

class MunitionsExpert implements IPostAkiLoadMod
{
    private database: DatabaseServer;
    private items: Record<string, ITemplateItem>;
    private cfg: { BulletBackgroundColours: boolean; } = require("./config.json");

    public postAkiLoad(container: DependencyContainer)
    {
        this.database = container.resolve<DatabaseServer>("DatabaseServer");
        this.items = this.database.getTables().templates.items;
        this.changeBulletColour();
    }

    private changeBulletColour()
    {
        if (this.cfg.BulletBackgroundColours)
        {
            for (const i in this.items) 
            {
                //set background colour of ammo depending on pen
                if (this.items[i]._parent === "5485a8684bdc2da71d8b4567") 
                {
                    const pen = this.items[i]._props.PenetrationPower;

                    switch (true) 
                    {
                        case (pen > 60):
                            this.items[i]._props.BackgroundColor = "red";
                            break;
                        case (pen > 50):
                            this.items[i]._props.BackgroundColor = "yellow";
                            break;
                        case (pen > 40):
                            this.items[i]._props.BackgroundColor = "violet";
                            break;
                        case (pen > 30):
                            this.items[i]._props.BackgroundColor = "blue";
                            break;
                        case (pen > 20):
                            this.items[i]._props.BackgroundColor = "green";
                            break;
                        default:
                            this.items[i]._props.BackgroundColor = "grey";
                            break;
                    }
                }
            }
        }
    }
}

module.exports = { mod: new MunitionsExpert() };

