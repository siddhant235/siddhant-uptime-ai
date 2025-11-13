import { Profile } from '../types/profile.types';

export const mockProfile: Profile = {
  username: 'shreeram',
  name: 'Shreeram Kushwaha',
  avatar: 'https://avatars.githubusercontent.com/u/19864447?v=4',
  bio: {
    title: 'Director of Engineering @UptimeAI',
    skills: [
      'Python',
      'Angular',
      'JavaScript',
      'Node.JS',
      'MongoDB',
      'Influx DB',
      'TimescaleDB',
      'Streamsets',
      'Kafka',
      'AWS',
      'Azure',
      'HTML5',
      'CSS'
    ],
    location: 'Bangalore, India',
    email: 'kushwaha.shreeram@gmail.com',
    website: 'http://shreeramkushwaha.com',
    twitter: '@poon_first'
  },
  stats: {
    followers: 11,
    following: 3
  },
  achievements: [
    {
      id: '1',
      icon: '🏆',
      name: 'Achievement Badge 1',
      description: 'Arctic Code Vault Contributor'
    },
    {
      id: '2',
      icon: '⭐',
      name: 'Achievement Badge 2',
      description: 'Pull Shark'
    },
    {
      id: '3',
      icon: '🎯',
      name: 'Achievement Badge 3',
      description: 'Quickdraw'
    }
  ],
  organizations: [
    {
      id: '1',
      name: 'UptimeAI',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      url: '#'
    }
  ]
};

