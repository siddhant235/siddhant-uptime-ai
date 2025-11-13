export interface ActivityRepository {
  name: string;
  count: number;
  url: string;
}

export interface Activity {
  id: string;
  type: 'commit' | 'pr' | 'issue' | 'review';
  count: number;
  repositories: ActivityRepository[];
  date: string;
  month: string;
  repositoryCount: number;
}

export interface Organization {
  name: string;
  username: string;
  avatar: string;
  url: string;
}

export interface ActivityOverview {
  organizations: Organization[];
  contributedRepositories: {
    name: string;
    url: string;
  }[];
  totalRepositories: number;
  codeReview: {
    commits: number;
    issues: number;
    pullRequests: number;
    codeReview: number;
  };
}

