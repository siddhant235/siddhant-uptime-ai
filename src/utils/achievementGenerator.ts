import { Achievement } from '../types/profile.types';
import { GitHubUser } from '../services/githubApi';

interface RepoStats {
    totalStars: number;
    totalForks: number;
    languages: Set<string>;
    hasPopularRepo: boolean;
}

// GitHub official achievement badge images
const GITHUB_BADGES = {
    YOLO: 'https://github.githubassets.com/assets/yolo-default-be0bbff04951.png',
    PULL_SHARK: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
    QUICKDRAW: 'https://github.githubassets.com/assets/quickdraw-default--light-medium-5450fadcbe37.png'
};

/**
 * Generates achievements based on GitHub user data
 * Since GitHub doesn't provide achievements via API, we create them based on stats
 */
export const generateAchievements = (
    user: GitHubUser,
    _repos: any[],
    _repoStats?: RepoStats
): Achievement[] => {
    const achievements: Achievement[] = [];

    // Calculate account age in years
    const accountAge = new Date().getFullYear() - new Date(user.created_at).getFullYear();

    // 1. YOLO Badge - for veteran users (5+ years)
    if (accountAge >= 5) {
        achievements.push({
            id: 'yolo',
            icon: GITHUB_BADGES.YOLO,
            name: 'YOLO',
            description: `${accountAge}+ years on GitHub`
        });
    }

    // 2. Pull Shark Badge - for active contributors (1+ repos)
    if (user.public_repos >= 1) {
        achievements.push({
            id: 'pull-shark',
            icon: GITHUB_BADGES.PULL_SHARK,
            name: 'Pull Shark',
            description: `${user.public_repos} merged pull ${user.public_repos === 1 ? 'request' : 'requests'}`
        });
    }

    // 3. Quickdraw Badge - for very active users (updated within 7 days)
    const lastUpdate = new Date(user.updated_at);
    const daysSinceUpdate = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceUpdate <= 7) {
        achievements.push({
            id: 'quickdraw',
            icon: GITHUB_BADGES.QUICKDRAW,
            name: 'Quickdraw',
            description: 'Opened an issue or pull request within 5 minutes of another user'
        });
    }

    // Return only these 3 badges
    return achievements;
};

/**
 * Calculate repository statistics for achievement generation
 */
export const calculateRepoStats = (repos: any[]): RepoStats => {
    const stats: RepoStats = {
        totalStars: 0,
        totalForks: 0,
        languages: new Set<string>(),
        hasPopularRepo: false
    };

    repos.forEach((repo) => {
        stats.totalStars += repo.stargazers_count || 0;
        stats.totalForks += repo.forks_count || 0;

        if (repo.language) {
            stats.languages.add(repo.language);
        }

        // A repo is "popular" if it has 10+ stars or 5+ forks
        if (repo.stargazers_count >= 10 || repo.forks_count >= 5) {
            stats.hasPopularRepo = true;
        }
    });

    return stats;
};

