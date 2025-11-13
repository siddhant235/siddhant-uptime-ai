import React from 'react';
import { ActivityOverview as ActivityOverviewType } from '../../../types/activity.types';
import './ActivityOverview.css';

interface ActivityOverviewProps {
  overview: ActivityOverviewType;
}

const ActivityOverview: React.FC<ActivityOverviewProps> = ({ overview }) => {
  const { commits, issues, pullRequests, codeReview } = overview.codeReview;
  
  // Calculate the max value for scaling
  const maxValue = Math.max(commits, issues, pullRequests, codeReview);
  const scale = 100 / maxValue;

  return (
    <section className="activity-overview">
      {/* Organizations */}
      {overview.organizations.length > 0 && (
        <div className="organizations-badges">
          {overview.organizations.map((org) => (
            <a 
              key={org.username} 
              href={org.url} 
              className="org-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={org.avatar} alt={org.name} className="org-avatar" />
              <span className="org-name">@{org.username}</span>
            </a>
          ))}
        </div>
      )}

      <h2 className="section-title">Activity overview</h2>

      <div className="activity-content">
        {/* Left side - Contributed repositories */}
        <div className="activity-text">
          <div className="contributed-info">
            <svg className="repo-icon" viewBox="0 0 16 16" width="16" height="16">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <div className="contributed-text">
              Contributed to{' '}
              {overview.contributedRepositories.slice(0, 3).map((repo, index) => (
                <span key={repo.url}>
                  {index > 0 && ', '}
                  <a href={repo.url} className="repo-link" target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </span>
              ))}
              {overview.totalRepositories > overview.contributedRepositories.length && (
                <span className="more-repos">
                  {' '}and {overview.totalRepositories - overview.contributedRepositories.length} other repositories
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Code review chart */}
        <div className="code-review-chart">
          <div className="chart-title">Code review</div>
          <div className="chart-container">
            <svg className="cross-chart" viewBox="0 0 200 200" width="200" height="200">
              {/* Grid lines */}
              <line x1="100" y1="20" x2="100" y2="180" stroke="var(--border-default)" strokeWidth="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="var(--border-default)" strokeWidth="1" />
              
              {/* Data lines */}
              <line 
                x1="100" 
                y1="100" 
                x2="100" 
                y2={100 - (commits * scale * 0.8)} 
                stroke="var(--accent-green)" 
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line 
                x1="100" 
                y1="100" 
                x2={100 + (issues * scale * 0.8)} 
                y2="100" 
                stroke="var(--accent-green)" 
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line 
                x1="100" 
                y1="100" 
                x2="100" 
                y2={100 + (pullRequests * scale * 0.8)} 
                stroke="var(--accent-green)" 
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line 
                x1="100" 
                y1="100" 
                x2={100 - (codeReview * scale * 0.8)} 
                y2="100" 
                stroke="var(--accent-green)" 
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Dots */}
              <circle cx="100" cy={100 - (commits * scale * 0.8)} r="4" fill="var(--accent-green)" />
              <circle cx={100 + (issues * scale * 0.8)} cy="100" r="4" fill="var(--accent-green)" />
              <circle cx="100" cy={100 + (pullRequests * scale * 0.8)} r="4" fill="var(--accent-green)" />
              <circle cx={100 - (codeReview * scale * 0.8)} cy="100" r="4" fill="var(--accent-green)" />
              
              {/* Center dot */}
              <circle cx="100" cy="100" r="4" fill="var(--accent-green)" />
            </svg>
            
            {/* Labels */}
            <div className="chart-labels">
              <div className="chart-label label-top">
                <span className="label-percentage">{commits}%</span>
                <span className="label-text">Commits</span>
              </div>
              <div className="chart-label label-right">
                <span className="label-text">Issues</span>
                <span className="label-percentage">{issues}%</span>
              </div>
              <div className="chart-label label-bottom">
                <span className="label-text">Pull requests</span>
                <span className="label-percentage">{pullRequests}%</span>
              </div>
              <div className="chart-label label-left">
                <span className="label-percentage">{codeReview}%</span>
                <span className="label-text">Code review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityOverview;

