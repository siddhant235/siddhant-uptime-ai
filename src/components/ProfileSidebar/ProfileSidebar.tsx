import React from 'react';
import { Profile } from '../../types/profile.types';
import './ProfileSidebar.css';

interface ProfileSidebarProps {
  profile: Profile;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile }) => {
  return (
    <aside className="profile-sidebar">
      {/* Avatar Section */}
      <div className="avatar-section">
        <img src={profile.avatar} alt={profile.name} className="avatar" />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-username">{profile.username}</p>
        <button className="edit-profile-btn">Edit profile</button>
      </div>

      {/* Bio Section */}
      <div className="bio-section">
        <p className="bio-title">{profile.bio.title}</p>
        
        <div className="bio-details">
          <div className="bio-item">
            <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
            </svg>
            <span>{profile.bio.location}</span>
          </div>
          
          <div className="bio-item">
            <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
              <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
            </svg>
            <a href={`mailto:${profile.bio.email}`}>{profile.bio.email}</a>
          </div>
          
          <div className="bio-item">
            <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
              <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z"></path>
            </svg>
            <a href={profile.bio.website} target="_blank" rel="noopener noreferrer">
              {profile.bio.website.replace('http://', '').replace('https://', '')}
            </a>
          </div>
          
          {profile.bio.twitter && (
            <div className="bio-item">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z"></path>
              </svg>
              <span>{profile.bio.twitter}</span>
            </div>
          )}
        </div>

        <div className="skills-section">
          {profile.bio.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      {/* Stats Section */}
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

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="achievements-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            {profile.achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-badge" title={achievement.description}>
                <span className="achievement-icon">{achievement.icon}</span>
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

