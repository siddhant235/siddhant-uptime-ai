import { Profile } from '../types/profile.types';
import { GitHubUser } from '../services/githubApi';
import { generateAchievements, calculateRepoStats } from './achievementGenerator';

export const mapGitHubUserToProfile = (
  githubUser: GitHubUser,
  repos: any[] = [],
  orgs: any[] = []
): Profile => {
  // Parse bio to extract skills
  const skills: string[] = [];

  // Extract skills from bio if available
  const techKeywords = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node', 'Angular', 'Vue',
    'Java', 'Go', 'Rust', 'Ruby', 'PHP', 'C++', 'C#', 'Swift', 'Kotlin',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'DevOps', 'CI/CD', 'Git', 'Linux', 'HTML5', 'CSS',
    'NodeJS', 'Node.JS', 'Kafka', 'Streamsets', 'TimescaleDB', 'Influx DB',
    'InfluxDB', 'Javascript', 'Angular'
  ];

  if (githubUser.bio) {
    techKeywords.forEach(keyword => {
      if (githubUser.bio.toLowerCase().includes(keyword.toLowerCase())) {
        if (!skills.some(s => s.toLowerCase() === keyword.toLowerCase())) {
          skills.push(keyword);
        }
      }
    });
  }

  // Clean company name (remove @ if present)
  const company = githubUser.company ? githubUser.company.replace(/^@/, '').trim() : undefined;

  // Clean bio text - replace \r\n with spaces and keep it as single line
  const bioText = githubUser.bio ? githubUser.bio.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim() : '';

  // Calculate repo stats and generate achievements
  const repoStats = repos.length > 0 ? calculateRepoStats(repos) : undefined;
  const achievements = generateAchievements(githubUser, repos, repoStats);

  // Use mock organizations if none are returned from API
  const mockOrganizations = [
    {
      id: '1',
      name: 'UptimeAI',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      url: 'https://github.com/UptimeAI'
    },
    {
      id: '2',
      name: 'Microsoft',
      avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4',
      url: 'https://github.com/microsoft'
    },
    {
      id: '3',
      name: 'Google',
      avatar: 'https://avatars.githubusercontent.com/u/1342004?v=4',
      url: 'https://github.com/google'
    }
  ];

  return {
    username: githubUser.login,
    name: githubUser.name || githubUser.login,
    avatar: githubUser.avatar_url,
    bio: {
      description: bioText || undefined,  // Full bio text
      title: bioText || company || '',     // Also use full bio as title
      company: company,
      skills: skills.length > 0 ? skills : ['Developer'],
      location: githubUser.location || '',
      email: githubUser.email || '',
      website: githubUser.blog || '',
      twitter: githubUser.twitter_username ? `@${githubUser.twitter_username}` : undefined,
      linkedin: undefined, // GitHub API doesn't provide this directly
      github: githubUser.login
    },
    stats: {
      followers: githubUser.followers,
      following: githubUser.following
    },
    achievements: achievements,
    organizations: orgs.length > 0
      ? orgs.map((org) => ({
        id: org.id.toString(),
        name: org.login,
        avatar: org.avatar_url,
        url: org.html_url || `https://github.com/${org.login}`
      }))
      : mockOrganizations // Use mock data if no organizations from API
  };
};

