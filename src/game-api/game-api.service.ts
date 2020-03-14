import { Injectable, HttpService } from '@nestjs/common';
import { IApiGuildData, IApiPlayerData, IApiKillData } from './types';

const API_URL = 'https://gameinfo.albiononline.com/api';
const GUILD_ID = 'khX_Fv24TdSp1qiqQLqHiQ';

@Injectable()
export class GameApiService {
  constructor(private readonly httpService: HttpService) {}

  async getGuildData() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/guilds/${GUILD_ID}`).toPromise();
    return res.data as IApiGuildData;
  }

  async getMembersData() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/guilds/${GUILD_ID}/members`).toPromise();
    return res.data as IApiPlayerData[];
  }

  async getTopKills() {
    const res = await this.httpService
      .get(`${API_URL}/gameinfo/guilds/${GUILD_ID}/top`, { params: { limit: 5 } })
      .toPromise();

    return res.data as IApiKillData[];
  }

  async getRecentKills() {
    const res = await this.httpService.get(`${API_URL}/gameinfo/events`, { params: { guildId: GUILD_ID } }).toPromise();
    return res.data;
  }
}
