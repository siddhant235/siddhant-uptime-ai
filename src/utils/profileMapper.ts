import { Profile } from '../types/profile.types';
import { GitHubUser } from '../services/githubApi';

export const mapGitHubUserToProfile = (githubUser: GitHubUser): Profile => {
  // Parse skills from bio if available (you can customize this logic)
  const skills: string[] = [];
  
  // If bio contains technology keywords, extract them
  const techKeywords = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node', 'Angular', 'Vue',
    'Java', 'Go', 'Rust', 'Ruby', 'PHP', 'C++', 'C#', 'Swift', 'Kotlin',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'DevOps', 'CI/CD', 'Git', 'Linux'
  ];

  if (githubUser.bio) {
    techKeywords.forEach(keyword => {
      if (githubUser.bio.toLowerCase().includes(keyword.toLowerCase())) {
        if (!skills.includes(keyword)) {
          skills.push(keyword);
        }
      }
    });
  }

  return {
    username: githubUser.login,
    name: githubUser.name || githubUser.login,
    avatar: githubUser.avatar_url,
    bio: {
      title: githubUser.company || githubUser.bio || '',
      skills: skills.length > 0 ? skills : ['Developer'],
      location: githubUser.location || '',
      email: githubUser.email || '',
      website: githubUser.blog || '',
      twitter: githubUser.twitter_username ? `@${githubUser.twitter_username}` : undefined
    },
    stats: {
      followers: githubUser.followers,
      following: githubUser.following
    },
    achievements: [
      {
        id: '1',
        icon: '🏆',
        name: 'Achievement Badge 1',
        description: 'GitHub User'
      },
      {
        id: '2',
        icon: '⭐',
        name: 'Achievement Badge 2',
        description: `${githubUser.public_repos} Repositories`
      },
      {
        id: '3',
        icon: '🎯',
        name: 'Achievement Badge 3',
        description: 'Open Source Contributor'
      }
    ],
    organizations: [] // We'll fetch this separately if needed
  };
};

