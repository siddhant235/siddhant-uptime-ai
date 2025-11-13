const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const githubApi = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getUserRepos(username: string, perPage: number = 6) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getUserEvents(username: string, perPage: number = 10) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/events/public?per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    
    return response.json();
  }
};

