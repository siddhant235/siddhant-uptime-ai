import React, { useState } from 'react';
import { Activity } from '../../../types/activity.types';
import './ContributionActivity.css';

interface ContributionActivityProps {
  activities: Activity[];
}

const ContributionActivity: React.FC<ContributionActivityProps> = ({ activities }) => {
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());

  const toggleActivity = (activityId: string) => {
    setExpandedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const getActivityIcon = (type: string) => {
    if (type === 'commit') {
      return (
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
        </svg>
      );
    } else if (type === 'pr') {
      return (
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
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

  // Group activities by month
  const groupedActivities = activities.reduce((acc, activity) => {
    const month = activity.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <section className="contribution-activity">
      <div className="activity-header-section">
        <h2 className="section-title">Contribution activity</h2>
      </div>

      <div className="activity-timeline">
        {Object.entries(groupedActivities).map(([month, monthActivities]) => (
          <div key={month} className="timeline-month-group">
            {/* Month header with line */}
            <div className="month-header">
              <h3 className="month-title">{month}</h3>
              <div className="month-line"></div>
            </div>

            {/* Connector line between month and first activity */}
            <div className="month-connector-line"></div>

            {/* Timeline content */}
            <div className="timeline-content">
              {/* Vertical line connecting activities in this month */}
              <div className="timeline-line" />

              {/* All activities for this month */}
              {monthActivities.map((activity) => (
                <div key={activity.id} className="activity-block">
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
                      <button
                        className="collapse-btn"
                        aria-label={expandedActivities.has(activity.id) ? "Collapse" : "Expand"}
                        onClick={() => toggleActivity(activity.id)}
                      >
                        <svg className="collapse-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                          <path d="M10.896 2H8.75V.75a.75.75 0 0 0-1.5 0V2H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 2ZM8.75 15.25a.75.75 0 0 1-1.5 0V14H5.104a.25.25 0 0 1-.177-.427l2.896-2.896a.25.25 0 0 1 .354 0l2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25Zm-6.5-6.5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Repository list */}
                    {activity.type === 'commit' && expandedActivities.has(activity.id) && (
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
                    {activity.type === 'pr' && expandedActivities.has(activity.id) && (
                      <div className="pr-repository-list">
                        {activity.repositories.map((repo, repoIndex) => (
                          <div key={repoIndex} className="pr-repo-item">
                            <a href={repo.url} className="pr-repo-name">
                              {repo.name}
                            </a>
                            <div className="pr-status-badges">
                              {(repo.merged !== undefined && repo.merged > 0) && (
                                <span className="status-badge merged">
                                  <span className="badge-count">{repo.merged}</span> merged
                                </span>
                              )}
                              {(repo.open !== undefined && repo.open > 0) && (
                                <span className="status-badge open">
                                  <span className="badge-count">{repo.open}</span> open
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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

