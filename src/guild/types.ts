

export interface IGuildData {
  id: string;
  name: string;
  memberCount: number;
}

export interface IGuildMemberDetails {
  id: string;
  name: string;
  avatar: string;
  avatarRing: string;
  killFame: number;
  deathFame: number;
  fameRatio: number;
  stats: {
    pve: number;
    gathering: number;
    crafting: number;
    crystalLeague: number;
  };
}

export interface IGuildMemberMap {
  [key: string]: IGuildMemberDetails;
}

export interface IGuildResponseData {
  guild: IGuildData;
  members: IGuildMemberMap;
}