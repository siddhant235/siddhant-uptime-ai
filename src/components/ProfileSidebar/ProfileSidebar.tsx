import React from 'react';
import { Profile } from '../../types/profile.types';
import './ProfileSidebar.css';

interface ProfileSidebarProps {
  profile: Profile;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile }) => {
  // Helper function to render bio with bold organization names (@mentions)
  const renderBioWithBoldOrgs = (text: string) => {
    // Split by @mentions and make them bold
    const parts = text.split(/(@\w+)/g);

    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return <strong key={index}>{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <aside className="profile-sidebar">
      {/* Avatar Section */}
      <div className="avatar-section">
        <img src={profile.avatar} alt={profile.name} className="avatar" />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-username">{profile.username}</p>
        {profile.bio.description && (
          <p className="profile-description">
            {renderBioWithBoldOrgs(profile.bio.description)}
          </p>
        )}
        <button className="edit-profile-btn">Edit profile</button>
      </div>
      <div className="stats-section">
        <a href="#" className="stat-item">
          <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.75.75 0 0 1-1.442.386 3.5 3.5 0 0 0-5.956-1.175.75.75 0 0 1-1.038-1.085 5.014 5.014 0 0 1 3.656-1.656Z"></path>
          </svg>
          <strong>{profile.stats.followers}</strong> followers
        </a>
        <span className="stat-separator">·</span>
        <a href="#" className="stat-item">
          <strong>{profile.stats.following}</strong> following
        </a>
      </div>
      {/* Bio Section */}
      <div className="bio-section">
        <div className="bio-details">
          {/* Company */}
          {profile.bio.company && (
            <div className="bio-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M0 1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75h-3A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm4.5 0a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25ZM9 9.75c0-.414.336-.75.75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75Zm.75-.25a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75ZM3.75 6a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5Zm-.75 3.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM3.75 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5ZM6.5 3.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM7.25 6a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM7.25 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5Z"></path>
              </svg>
              <span>{profile.bio.company}</span>
            </div>
          )}

          {/* Location */}
          {profile.bio.location && (
            <div className="bio-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
              </svg>
              <span>{profile.bio.location}</span>
            </div>
          )}

          {/* Website */}
          {profile.bio.website && (
            <div className="bio-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z"></path>
              </svg>
              <a href={profile.bio.website} target="_blank" rel="noopener noreferrer">
                {profile.bio.website.replace('http://', '').replace('https://', '')}
              </a>
            </div>
          )}

          {/* Email */}
          {profile.bio.email && (
            <div className="bio-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
              </svg>
              <a href={`mailto:${profile.bio.email}`}>{profile.bio.email}</a>
            </div>
          )}

          {/* Social Media */}
          {profile.bio.twitter && (
            <div className="bio-item social-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M9.294 6.928 14.357 1h-1.2L8.762 6.147 5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05L9.294 6.928ZM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977.538.775 4.491 6.47h-1.843l-3.664-5.28Z"></path>
              </svg>
              <a href={`https://twitter.com/${profile.bio.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                {profile.bio.twitter}
              </a>
            </div>
          )}

          {profile.bio.linkedin && (
            <div className="bio-item social-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z"></path>
              </svg>
              <a href={`https://linkedin.com/in/${profile.bio.linkedin}`} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/{profile.bio.linkedin}
              </a>
            </div>
          )}

          {profile.bio.github && (
            <div className="bio-item social-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <a href={`https://github.com/${profile.bio.github}`} target="_blank" rel="noopener noreferrer">
                @{profile.bio.github}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}


      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="achievements-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            {profile.achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-badge" title={achievement.description}>
                {achievement.icon.startsWith('http') ? (
                  <img
                    src={achievement.icon}
                    alt={achievement.name}
                    className="achievement-badge-img"
                  />
                ) : (
                  <span className="achievement-icon">{achievement.icon}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organizations */}
      {profile.organizations.length > 0 && (
        <div className="organizations-section">
          <h2 className="section-title">Organizations</h2>
          <div className="organizations-grid">
            {profile.organizations.map((org) => (
              <a key={org.id} href={org.url} className="org-logo" title={org.name}>
                <img src={org.avatar} alt={org.name} />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProfileSidebar;

