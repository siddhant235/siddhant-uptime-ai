import { Activity, ActivityOverview } from '../types/activity.types';

export const mockActivityOverview: ActivityOverview = {
  organizations: [
    {
      name: 'UptimeAI',
      username: 'UptimeAI',
      avatar: 'https://avatars.githubusercontent.com/u/123456?v=4',
      url: 'https://github.com/UptimeAI'
    },
    {
      name: 'Timescale',
      username: 'timescale',
      avatar: 'https://avatars.githubusercontent.com/u/654321?v=4',
      url: 'https://github.com/timescale'
    }
  ],
  contributedRepositories: [
    { name: 'UptimeAI/uptime_webapp', url: 'https://github.com/UptimeAI/uptime_webapp' },
    { name: 'UptimeAI/uptime_server', url: 'https://github.com/UptimeAI/uptime_server' },
    { name: 'UptimeAI/uptime_ml', url: 'https://github.com/UptimeAI/uptime_ml' }
  ],
  totalRepositories: 16,
  codeReview: {
    commits: 83,
    issues: 0,
    pullRequests: 17,
    codeReview: 0
  }
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'commit',
    count: 56,
    repositoryCount: 11,
    month: 'October 2025',
    date: '2025-10',
    repositories: [
      { name: 'UptimeAI/uptime_webapp', count: 23, url: 'https://github.com/UptimeAI/uptime_webapp' },
      { name: 'UptimeAI/uptime_server', count: 15, url: 'https://github.com/UptimeAI/uptime_server' },
      { name: 'UptimeAI/uptime_ml', count: 10, url: 'https://github.com/UptimeAI/uptime_ml' },
      { name: 'UptimeAI/uptime_engine', count: 5, url: 'https://github.com/UptimeAI/uptime_engine' },
      { name: 'shreeram/node-opcua-logger', count: 3, url: 'https://github.com/shreeram/node-opcua-logger' }
    ]
  },
  {
    id: '2',
    type: 'pr',
    count: 29,
    repositoryCount: 5,
    month: 'October 2025',
    date: '2025-10',
    repositories: [
      { name: 'UptimeAI/uptime_webapp', count: 16, url: 'https://github.com/UptimeAI/uptime_webapp' },
      { name: 'UptimeAI/uptime_ml', count: 5, url: 'https://github.com/UptimeAI/uptime_ml' },
      { name: 'UptimeAI/uptime_scripts', count: 4, url: 'https://github.com/UptimeAI/uptime_scripts' },
      { name: 'UptimeAI/uptime_engine', count: 3, url: 'https://github.com/UptimeAI/uptime_engine' },
      { name: 'UptimeAI/uptime_ml_encrypted', count: 1, url: 'https://github.com/UptimeAI/uptime_ml_encrypted' }
    ]
  }
];

