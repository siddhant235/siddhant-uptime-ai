import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfileSidebar from '../components/ProfileSidebar/ProfileSidebar';
import MainContent from '../components/MainContent/MainContent';
import { useGitHubUser } from '../hooks/useGitHubUser';
import { useGitHubContributions } from '../hooks/useGitHubContributions';
import { mockContributions } from '../data/mockContributions';
import { mockActivities, mockActivityOverview } from '../data/mockActivity';
import './ProfilePage.css';

// Change this username to fetch different GitHub profiles
const GITHUB_USERNAME = 'shreeramk';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const { profile, repositories, isLoading, error } = useGitHubUser(GITHUB_USERNAME);
    const { contributions } = useGitHubContributions(GITHUB_USERNAME);

    if (isLoading) {
        return (
            <div className="profile-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading GitHub profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="profile-page">
                <div className="error-container">
                    <svg className="error-icon" viewBox="0 0 24 24" width="48" height="48">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <h2 className="error-title">Failed to load profile</h2>
                    <p className="error-description">{error || 'Unable to fetch GitHub user data'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Header
                username={profile.username}
                avatar={profile.avatar}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <div className="profile-container">
                <ProfileSidebar profile={profile} />

                {activeTab === 'overview' ? (
                    <MainContent
                        repositories={repositories}
                        contributions={contributions || mockContributions}
                        activities={mockActivities}
                        activityOverview={mockActivityOverview}
                    />
                ) : (
                    <div className="empty-tab-content">
                        <svg className="empty-icon" viewBox="0 0 24 24" width="48" height="48">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        <h2 className="empty-title">No content available</h2>
                        <p className="empty-description">
                            The <strong>{activeTab}</strong> tab content hasn't been implemented yet.
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;

