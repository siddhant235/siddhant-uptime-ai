import React, { useState } from 'react';
import { Activity } from '../../../types/activity.types';
import './ContributionActivity.css';

interface ContributionActivityProps {
  activities: Activity[];
}

const ContributionActivity: React.FC<ContributionActivityProps> = ({ activities }) => {
  const [selectedYear, setSelectedYear] = useState('2020');
  const years = ['2020', '2019'];

  const getActivityIcon = (type: string) => {
    if (type === 'commit') {
      return (
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
        </svg>
      );
    } else if (type === 'repository') {
      return (
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
        </svg>
      );
    }
    return null;
  };

  const getActivityTypeText = (type: string) => {
    if (type === 'commit') return 'commits';
    if (type === 'repository') return 'repositories';
    if (type === 'pr') return 'pull requests';
    return 'activities';
  };

  return (
    <section className="contribution-activity">
      <div className="activity-header-section">
        <h2 className="section-title">Contribution activity</h2>
        <div className="year-filter">
          {years.map((year) => (
            <button
              key={year}
              className={`year-btn ${selectedYear === year ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="activity-timeline">
        {activities.map((activity, index) => (
          <div key={activity.id} className="timeline-item">
            {/* Month header with line */}
            <div className="month-header">
              <h3 className="month-title">{activity.month}</h3>
              <div className="month-line"></div>
            </div>

            {/* Timeline content */}
            <div className="timeline-content">
              {/* Vertical line */}
              {index < activities.length - 1 && <div className="timeline-line" />}
              
              {/* Activity block */}
              <div className="activity-block">
                <div className="activity-icon-wrapper">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                <div className="activity-content">
                  <div className="activity-summary">
                    <span className="activity-text">
                      {activity.type === 'commit' ? 'Created' : activity.type === 'pr' ? 'Opened' : 'Created'}{' '}
                      <strong>{activity.count}</strong> {getActivityTypeText(activity.type)} in{' '}
                      <strong>{activity.repositoryCount}</strong> {activity.repositoryCount === 1 ? 'repository' : 'repositories'}
                    </span>
                    <button className="collapse-btn" aria-label="Show more details">
                      <svg viewBox="0 0 16 16" width="16" height="16">
                        <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Repository list */}
                  {activity.type === 'commit' && (
                    <div className="repository-list">
                      {activity.repositories.map((repo, repoIndex) => (
                        <div key={repoIndex} className="repo-item">
                          <a href={repo.url} className="repo-name">
                            {repo.name}
                          </a>
                          <div className="repo-stats">
                            <div className="commit-bar-wrapper">
                              <div 
                                className="commit-bar" 
                                style={{ width: `${(repo.count / activity.count) * 100}%` }}
                              />
                            </div>
                            <span className="commit-count">{repo.count} {getActivityTypeText(activity.type)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pull request list with status badges */}
                  {activity.type === 'pr' && (
                    <div className="pr-repository-list">
                      {activity.repositories.map((repo, repoIndex) => (
                        <div key={repoIndex} className="pr-repo-item">
                          <a href={repo.url} className="pr-repo-name">
                            {repo.name}
                          </a>
                          <div className="pr-status-badges">
                            <span className="status-badge merged">
                              {repo.count - 1} merged
                            </span>
                            <span className="status-badge open">
                              1 open
                            </span>
                            <button className="collapse-btn-small" aria-label="Show more details">
                              <svg viewBox="0 0 16 16" width="16" height="16">
                                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="show-more-section">
        <button className="show-more-btn">Show more activity</button>
        <p className="guide-text">
          Seeing something unexpected? <a href="#" className="guide-link">Take a look at the GitHub profile guide</a>.
        </p>
      </div>
    </section>
  );
};

export default ContributionActivity;

