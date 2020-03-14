import { Injectable, Logger } from '@nestjs/common';
import { GameApiService } from '../game-api/game-api.service';
import { IApiPlayerData, IApiGuildData, IApiKillData, IApiItemData } from '../game-api/types';
import * as Bluebird from 'bluebird';
import { IGuildData, IPlayerDetails, IGuildResponseData, IGuildMemberMap } from './types';

const parseGuildData = (data: IApiGuildData): IGuildData => ({
  id: data.Id,
  name: data.Name,
  memberCount: data.MemberCount,
});

const parseGuildMemberData = (data: IApiPlayerData): IPlayerDetails => ({
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

const parseItemData = (data: IApiItemData) => data && ({
  type: data.Type,
  count: data.Count,
  quality: data.Quality,
  tq: `${data.Type[1]}.${data.Quality}`,
});

const parseKillParticipantData = (data: IApiPlayerData) => ({
  id: data.Id,
  name: data.Name,
  killFame: data.KillFame,
  deathFame: data.DeathFame,
  equipment: Object.keys(data.Equipment).reduce((equipment, slot) => {
    equipment[slot] = parseItemData(data.Equipment[slot]);
    return equipment;
  }, {}),
  inventory: data.Inventory.filter(Boolean).map(parseItemData),
});

const parseKillData = (data: IApiKillData) => ({
  eventId: data.EventId,
  participantCount: data.numberOfParticipants,
  timestamp: data.TimeStamp,
  killer: parseKillParticipantData(data.Killer),
  victim: parseKillParticipantData(data.Victim),
  totalVictimKillFame: data.TotalVictimKillFame,
  location: '???',
  participants: data.Participants.map(parseKillParticipantData),
  // KillArea: string;
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
      const memberDetails = parseGuildMemberData(data);
      this.members[memberDetails.id] = memberDetails;
    });
  }

  async updateGuildData() {
    const data = await this.gameApiService.getGuildData();
    this.guild = parseGuildData(data);
  }

  async updateTopKillsData() {
    const data = await this.gameApiService.getTopKills();
    this.topKills = data.map(parseKillData);
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
