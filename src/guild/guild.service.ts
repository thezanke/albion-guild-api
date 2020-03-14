import { Injectable, Logger } from '@nestjs/common';
import { GameApiService, IApiGuildMemberData, IApiGuildData } from '../game-api/game-api.service';
import * as Bluebird from 'bluebird';
import { IGuildData, IGuildMemberDetails, IGuildResponseData, IGuildMemberMap } from './types';

const parseGuildData = (data: IApiGuildData): IGuildData => ({
  id: data.Id,
  name: data.Name,
  memberCount: data.MemberCount,
});

const parseMemberData = (data: IApiGuildMemberData): IGuildMemberDetails => ({
  id: data.Id,
  name: data.Name,
  avatar: data.Avatar,
  avatarRing: data.AvatarRing,
  killFame: data.KillFame,
  deathFame: data.DeathFame,
  fameRatio: data.FameRatio,
  stats: {
    pve: data.LifetimeStatistics.PvE.Total,
    gathering: data.LifetimeStatistics.Gathering.All.Total,
    crafting: data.LifetimeStatistics.Crafting.Total,
    crystalLeague: data.LifetimeStatistics.CrystalLeague,
  },
});

@Injectable()
export class GuildService {
  logger = new Logger('GuildService');
  guild: IGuildData;
  members: IGuildMemberMap = {};
  topKills: any[] = [];

  constructor(private readonly gameApiService: GameApiService) {
    setInterval(() => this.updateData(), 60 * 1000);
    this.updateData();
  }

  updateMembersData() {
    return Bluebird.each(this.gameApiService.getMembersData(), data => {
      const memberDetails = parseMemberData(data);
      this.members[memberDetails.id] = memberDetails;
    });
  }

  async updateGuildData() {
    const data = await this.gameApiService.getGuildData();
    this.guild = parseGuildData(data);
  }

  async updateTopKillsData() {
    const data = await this.gameApiService.getTopKills();
    this.topKills = data;
  }

  updateData() {
    return Bluebird.all([this.updateGuildData(), this.updateMembersData(), this.updateTopKillsData()]);
  }

  getData(): IGuildResponseData {
    return {
      guild: this.guild,
      members: this.members,
      topKills: this.topKills,
    };
  }
}
