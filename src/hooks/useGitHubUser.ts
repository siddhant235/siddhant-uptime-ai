import { useState, useEffect } from 'react';
import { githubApi } from '../services/githubApi';
import { Profile } from '../types/profile.types';
import { Repository } from '../types/repository.types';
import { mapGitHubUserToProfile } from '../utils/profileMapper';
import { mapGitHubReposToRepositories } from '../utils/repositoryMapper';

interface UseGitHubUserResult {
  profile: Profile | null;
  repositories: Repository[];
  isLoading: boolean;
  error: string | null;
}

export const useGitHubUser = (username: string): UseGitHubUserResult => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user profile, repositories, and organizations
        const userData = await githubApi.getUser(username);
        const reposData = await githubApi.getUserRepos(username, 6);
        
        // Fetch organizations (handle errors gracefully)
        let orgsData = [];
        try {
          orgsData = await githubApi.getUserOrgs(username);
        } catch (orgError) {
          console.warn('Failed to fetch organizations:', orgError);
          // Continue without organizations
        }
        
        // Map profile with repo and org data
        const mappedProfile = mapGitHubUserToProfile(userData, reposData, orgsData);
        setProfile(mappedProfile);

        // Map repositories
        const mappedRepos = mapGitHubReposToRepositories(reposData);
        setRepositories(mappedRepos);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
        console.error('Error fetching GitHub user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return { profile, repositories, isLoading, error };
};

