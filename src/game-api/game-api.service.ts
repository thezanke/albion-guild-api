import { Injectable, HttpService } from '@nestjs/common';

const API_URL = 'https://gameinfo.albiononline.com/api';
const GUILD_ID = 'khX_Fv24TdSp1qiqQLqHiQ';

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

export interface IApiGuildMemberData {
  AverageItemPower: number;
  Equipment: {};
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

@Injectable()
export class GameApiService {
  constructor(private readonly httpService: HttpService) {}

  async getGuildData() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/guilds/${GUILD_ID}`).toPromise();
    return res.data as IApiGuildData;
  }

  async getMembersData() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/guilds/${GUILD_ID}/members`).toPromise();
    return res.data as IApiGuildMemberData[];
  }

  async getTopKills() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/guilds/${GUILD_ID}/top`).toPromise();
    return res.data;
  }

  async getRecentKills() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/events`, { params: { guildId: GUILD_ID } }).toPromise();
    return res.data;
  }
}
