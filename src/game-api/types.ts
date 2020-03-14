export interface IApiGuildData {
  Id: string;
  Name: string;
  FounderId: string;
  FounderName: string;
  Founded: string;
  AllianceTag: string;
  AllianceId: string;
  killFame: number;
  DeathFame: number;
  AttacksWon: null;
  DefensesWon: null;
  MemberCount: number;
}

export interface IApiPlayerData {
  AverageItemPower: number;
  Name: string;
  Id: string;
  GuildName: string;
  GuildId: string;
  AllianceName: string;
  AllianceId: string;
  AllianceTag: string;
  Avatar: string;
  AvatarRing: string;
  DeathFame: number;
  KillFame: number;
  FameRatio: number;
  Equipment: {
    MainHand: IPlayerItemData;
    OffHand: IPlayerItemData;
    Head: IPlayerItemData;
    Armor: IPlayerItemData;
    Shoes: IPlayerItemData;
    Bag: IPlayerItemData;
    Cape: IPlayerItemData;
    Mount: IPlayerItemData;
    Potion: IPlayerItemData;
    Food: IPlayerItemData;
  };
  Inventory: Array<IPlayerItemData>;
  LifetimeStatistics: {
    PvE: {
      Total: number;
      Royal: number;
      Outlands: number;
      Hellgate: number;
    };
    Gathering: {
      Fiber: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
      Hide: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
      Ore: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
      Rock: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
      Wood: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
      All: {
        Total: number;
        Royal: number;
        Outlands: number;
      };
    };
    Crafting: {
      Total: number;
      Royal: number;
      Outlands: number;
    };
    CrystalLeague: number;
    Timestamp: string;
  };
}

export interface IApiItemData {
  Type: string;
  Count: number;
  Quality: number;
  ActiveSpells: [];
  PassiveSpells: [];
}

export type IPlayerItemData = IApiItemData | null;

export interface IApiEventData {
  EventId: number;
  Type: string;
}

export type IApiKillData = IApiEventData & {
  numberOfParticipants: number;
  groupMemberCount: number;
  TimeStamp: string;
  Version: number;
  Killer: IApiPlayerData;
  Victim: IApiPlayerData;
  TotalVictimKillFame: number;
  Location: null;
  Participants: IApiPlayerData[];
  GroupMembers: IApiPlayerData[];
  GvGMatch: null;
  BattleId: number;
  KillArea: string;
};
