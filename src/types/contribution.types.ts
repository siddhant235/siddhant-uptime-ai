export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionYear {
  year: number;
  total: number;
  weeks: ContributionWeek[];
}

export interface ContributionData {
  totalContributions: number;
  years: ContributionYear[];
}

