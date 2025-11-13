const GITHUB_API_BASE = 'https://api.github.com';

// Helper to get auth headers
const getAuthHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

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
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  },

  async getUserRepos(username: string, perPage: number = 6) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${perPage}`,
      {
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    return response.json();
  },

  async getUserEvents(username: string, perPage: number = 10) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/events/public?per_page=${perPage}`,
      {
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    return response.json();
  },

  async getUserOrgs(username: string) {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/orgs`,
      {
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations: ${response.statusText}`);
    }

    return response.json();
  },

  async getUserContributions(username: string) {
    // Calculate date range for last year (including current date)
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setDate(today.getDate() + 1); // Start from day after one year ago

    const fromDate = oneYearAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];

    // GitHub GraphQL query for contributions
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    const headers = {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    };

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: `${fromDate}T00:00:00Z`,
          to: `${toDate}T23:59:59Z`
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contributions: ${response.statusText}`);
    }

    return response.json();
  }
};

