import { Repository } from '../types/repository.types';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  private: boolean;
  fork: boolean;
  forks_count: number;
  stargazers_count: number;
  html_url: string;
  parent?: {
    full_name: string;
    html_url: string;
  };
}

const languageColors: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B'
};

export const mapGitHubRepoToRepository = (githubRepo: GitHubRepo): Repository => {
  const language = githubRepo.language || 'Unknown';
  const languageColor = languageColors[language] || '#586069';

  let forkedFrom = undefined;
  if (githubRepo.fork && githubRepo.parent) {
    const [owner, repo] = githubRepo.parent.full_name.split('/');
    forkedFrom = {
      owner,
      repo,
      url: githubRepo.parent.html_url
    };
  }

  return {
    id: githubRepo.id.toString(),
    name: githubRepo.name,
    fullName: githubRepo.full_name,
    description: githubRepo.description || 'No description provided',
    language: {
      name: language,
      color: languageColor
    },
    visibility: githubRepo.private ? 'Private' : 'Public',
    forkedFrom,
    stars: githubRepo.stargazers_count,
    forks: githubRepo.forks_count,
    url: githubRepo.html_url
  };
};

export const mapGitHubReposToRepositories = (githubRepos: GitHubRepo[]): Repository[] => {
  return githubRepos.map(mapGitHubRepoToRepository);
};

