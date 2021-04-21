export interface SummonerAllData {
  summonerInfo?: {
    id: string;
    accountId: string;
    name: string;
  };
  leagueInfo?: LeagueInfo;
  laneInfo?: LaneInfo;
  recentMatches?: MatchInfo[];
  recentChampionStats?: PlayerMatchInfo[];
  kdaTimelineData?: KDAEventData[];
  expTimelineData?: FrameExpData[][];
}
export interface MatchInfo {
  platformId: string;
  gameId: number;
  champion: number;
  queue: number;
  season: number;
  timestamp: number;
  role: string;
  lane: string;
}

export interface LeagueInfo {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface LaneInfo {
  [index: string]: any;
  TOP: number;
  JUNGLE: number;
  MID: number;
  AD_CARRY: number;
  SUPPORT: number;
}
export interface PlayerMatchInfo {
  gameId: number;
  champion: number;
  stats: {
    participantId: number;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
  };
}
export interface FrameExpData {
  timestamp: number;
  participantFrames: ParticipantFrames;
}

export interface ParticipantFrames {
  [index: string]: any;
  participantId: number;
  position: Position;
  currentGold: number;
  totalGold: number;
  level: number;
  xp: number;
  minionsKilled: number;
  jungleMinionsKilled: number;
  dominionScore: number;
  teamScore: number;
}

export interface Position {
  x: number;
  y: number;
}
export interface KDAEventData {
  matchKills: number;
  matchAssists: number;
  matchDeaths: number;
  matchDragonKills: number;
  matchHeraldKills: number;
  matchKillForLevel3: number;
  matchAssistForLevel3: number;
  matchDeathForLevel3: number;
  matchKillForLevel2: number;
  matchAssistForLevel2: number;
  matchDeathForLevel2: number;
}
