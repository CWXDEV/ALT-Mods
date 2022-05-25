import { Item } from "./IItem";
export interface IQuest {
    QuestName: string;
    _id: string;
    canShowNotificationsInGame: boolean;
    conditions: Conditions;
    description: string;
    failMessageText: string;
    name: string;
    note: string;
    traderId: string;
    location: string;
    image: string;
    type: string;
    isKey: boolean;
    restartable: boolean;
    instantComplete: boolean;
    secretQuest: boolean;
    startedMessageText: string;
    successMessageText: string;
    templateId: string;
    rewards: Rewards;
    status: string;
    KeyQuest: boolean;
    changeQuestMessageText: string;
}
export interface Conditions {
    Started: AvailableForConditions[];
    AvailableForFinish: AvailableForConditions[];
    AvailableForStart: AvailableForConditions[];
    Success: AvailableForConditions[];
    Fail: AvailableForConditions[];
}
export interface AvailableForConditions {
    _parent: string;
    _props: AvailableForProps;
    dynamicLocale: boolean;
}
export interface AvailableForProps {
    id: string;
    index: number;
    parentId: string;
    dynamicLocale: boolean;
    value?: number;
    compareMethod?: string;
    visibilityConditions?: VisibilityCondition[];
    target?: string;
    status?: number[];
}
export interface VisibilityCondition {
    id: string;
    value: number;
    dynamicLocale: boolean;
    oneSessionOnly: boolean;
}
export interface Rewards {
    AvailableForStart: Reward[];
    AvailableForFinish: Reward[];
    Started: Reward[];
    Success: Reward[];
    Fail: Reward[];
    FailRestartable: Reward[];
    Expired: Reward[];
}
export interface Reward {
    value?: string;
    id: string;
    type: string;
    index: number;
    target?: string;
    items?: Item[];
    loyaltyLevel?: number;
    traderId?: string;
    unknown?: boolean;
    findInRaid?: boolean;
}
