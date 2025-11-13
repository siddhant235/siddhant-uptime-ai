import { Profile } from '../types/profile.types';

export const mockProfile: Profile = {
  username: 'shreeram',
  name: 'Shreeram Kushwaha',
  avatar: 'https://avatars.githubusercontent.com/u/19864447?v=4',
  bio: {
    description: 'Building scalable systems and leading engineering teams. Passionate about distributed systems and cloud architecture.',
    title: 'Director of Engineering',
    company: 'UptimeAI',
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
    twitter: '@poon_first',
    linkedin: 'shreeram-kushwaha',
    github: 'shreeram'
  },
  stats: {
    followers: 11,
    following: 3
  },
  achievements: [
    {
      id: 'yolo',
      icon: 'https://github.githubassets.com/assets/yolo-default-be0bbff04951.png',
      name: 'YOLO',
      description: '5+ years on GitHub'
    },
    {
      id: 'pull-shark',
      icon: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
      name: 'Pull Shark',
      description: '8 merged pull requests'
    },
    {
      id: 'quickdraw',
      icon: 'https://github.githubassets.com/assets/quickdraw-default--light-medium-5450fadcbe37.png',
      name: 'Quickdraw',
      description: 'Opened an issue or pull request within 5 minutes of another user'
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

