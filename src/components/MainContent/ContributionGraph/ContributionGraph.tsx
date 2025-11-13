import React, { useState } from 'react';
import { ContributionData } from '../../../types/contribution.types';
import { ActivityOverview } from '../../../types/activity.types';
import './ContributionGraph.css';

interface ContributionGraphProps {
  contributionData: ContributionData;
  activityOverview?: ActivityOverview;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ contributionData, activityOverview }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const currentYearData = contributionData.years.find(y => y.year === selectedYear);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekDays = ['Mon', 'Wed', 'Fri'];

  const getLevelColor = (level: 0 | 1 | 2 | 3 | 4): string => {
    const colors = {
      0: 'var(--contrib-none)',
      1: 'var(--contrib-low)',
      2: 'var(--contrib-medium-low)',
      3: 'var(--contrib-medium)',
      4: 'var(--contrib-high)'
    };
    return colors[level];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  // Generate years array (e.g., 2013-2025)
  const availableYears = contributionData.years.map(y => y.year).sort((a, b) => b - a);

  return (
    <section className="contribution-graph">
      <div className="graph-header">
        <h2 className="graph-title">
          {formatNumber(contributionData.totalContributions)} contributions in the last year
        </h2>
        <div className="year-selector">
          <button className="year-btn">
            Contribution settings
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="graph-container">
        <div className="graph-wrapper">
          {/* Month labels */}
          <div className="month-labels">
            {months.map((month, index) => (
              <span key={index} className="month-label">
                {month}
              </span>
            ))}
          </div>

          <div className="graph-content">
            {/* Day labels */}
            <div className="day-labels">
              {weekDays.map((day, index) => (
                <span key={index} className="day-label">
                  {day}
                </span>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="contribution-grid">
              {currentYearData?.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week-column">
                  {week.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="contribution-day"
                      style={{ backgroundColor: getLevelColor(day.level) }}
                      onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                      onMouseLeave={() => setHoveredDay(null)}
                      data-date={day.date}
                      data-count={day.count}
                    >
                      {hoveredDay?.date === day.date && (
                        <div className="tooltip">
                          <strong>{day.count} contributions</strong> on {formatDate(day.date)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="graph-legend">
          <span className="legend-text">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="legend-box"
              style={{ backgroundColor: getLevelColor(level as 0 | 1 | 2 | 3 | 4) }}
            ></div>
          ))}
          <span className="legend-text">More</span>
        </div>
      </div>

      {/* Year Timeline on Right Side */}
      <div className="year-timeline">
        {availableYears.map((year) => (
          <button
            key={year}
            className={`timeline-year ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Activity Overview Section Below Heatmap */}
      {activityOverview && (
        <div className="activity-section">
          {/* Organizations Chips */}
          {activityOverview.organizations.length > 0 && (
            <div className="organizations-chips">
              {activityOverview.organizations.map((org) => (
                <a 
                  key={org.username} 
                  href={org.url} 
                  className="org-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={org.avatar} alt={org.name} className="org-chip-avatar" />
                  <span className="org-chip-name">@{org.username}</span>
                </a>
              ))}
            </div>
          )}

          <div className="activity-row">
            {/* Left: Activity Overview */}
            <div className="activity-text-section">
              <h3 className="activity-section-title">Activity overview</h3>
              <div className="contributed-info">
                <svg className="repo-icon" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <div className="contributed-text">
                  Contributed to{' '}
                  {activityOverview.contributedRepositories.slice(0, 3).map((repo, index) => (
                    <span key={repo.url}>
                      {index > 0 && ', '}
                      <a href={repo.url} className="repo-link" target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </span>
                  ))}
                  {activityOverview.totalRepositories > activityOverview.contributedRepositories.length && (
                    <span className="more-repos">
                      {' '}and {activityOverview.totalRepositories - activityOverview.contributedRepositories.length} other repositories
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Code Review Chart */}
            <div className="code-review-section">
              <div className="code-review-title">Code review</div>
              <div className="code-review-chart-container">
                <svg className="cross-chart" viewBox="0 0 300 300" width="260" height="260">
                  <defs>
                    {/* Gradient for filled area between commits and pull requests */}
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  
                  {/* Vertical axis */}
                  <line x1="150" y1="40" x2="150" y2="260" stroke="var(--border-default)" strokeWidth="1.5" />
                  
                  {/* Horizontal axis */}
                  <line x1="40" y1="150" x2="260" y2="150" stroke="var(--border-default)" strokeWidth="1.5" />
                  
                  {/* Calculate positions based on correct mapping:
                      - Top (y-): Code review
                      - Left (x-): Commits (83%)
                      - Bottom (y+): Pull requests (17%)
                      - Right (x+): Issues
                  */}
                  {(() => {
                    const codeReviewY = 150 - (activityOverview.codeReview.codeReview * 1.0); // Top
                    const commitsX = 150 - (activityOverview.codeReview.commits * 1.0); // Left
                    const pullRequestsY = 150 + (activityOverview.codeReview.pullRequests * 1.0); // Bottom
                    const issuesX = 150 + (activityOverview.codeReview.issues * 1.0); // Right
                    
                    return (
                      <>
                        {/* Filled gradient area between Commits (left) and Pull Requests (bottom) */}
                        {activityOverview.codeReview.commits > 0 && activityOverview.codeReview.pullRequests > 0 && (
                          <polygon
                            points={`150,150 ${commitsX},150 150,${pullRequestsY}`}
                            fill="url(#greenGradient)"
                            stroke="none"
                          />
                        )}
                        
                        {/* Code review line (top) */}
                        {activityOverview.codeReview.codeReview > 0 && (
                          <>
                            <line 
                              x1="150" 
                              y1="150" 
                              x2="150" 
                              y2={codeReviewY}
                              stroke="var(--accent-green)" 
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="150" cy={codeReviewY} r="6" fill="white" stroke="var(--accent-green)" strokeWidth="2.5" />
                          </>
                        )}
                        
                        {/* Commits line (left) */}
                        {activityOverview.codeReview.commits > 0 && (
                          <>
                            <line 
                              x1="150" 
                              y1="150" 
                              x2={commitsX}
                              y2="150" 
                              stroke="var(--accent-green)" 
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx={commitsX} cy="150" r="6" fill="white" stroke="var(--accent-green)" strokeWidth="2.5" />
                          </>
                        )}
                        
                        {/* Pull requests line (bottom) */}
                        {activityOverview.codeReview.pullRequests > 0 && (
                          <>
                            <line 
                              x1="150" 
                              y1="150" 
                              x2="150" 
                              y2={pullRequestsY}
                              stroke="var(--accent-green)" 
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="150" cy={pullRequestsY} r="6" fill="white" stroke="var(--accent-green)" strokeWidth="2.5" />
                          </>
                        )}
                        
                        {/* Issues line (right) */}
                        {activityOverview.codeReview.issues > 0 && (
                          <>
                            <line 
                              x1="150" 
                              y1="150" 
                              x2={issuesX}
                              y2="150" 
                              stroke="var(--accent-green)" 
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx={issuesX} cy="150" r="6" fill="white" stroke="var(--accent-green)" strokeWidth="2.5" />
                          </>
                        )}
                        
                        {/* Center dot - hollow */}
                        <circle cx="150" cy="150" r="6" fill="white" stroke="var(--accent-green)" strokeWidth="2.5" />
                      </>
                    );
                  })()}
                </svg>
                
                {/* Labels with correct positioning */}
                <div className="chart-labels">
                  {/* Code review - Top */}
                  <div className="chart-label label-top">
                    <span className="label-text">Code review</span>
                  </div>
                  
                  {/* Commits - Left */}
                  <div className="chart-label label-left">
                    <span className="label-percentage">{activityOverview.codeReview.commits}%</span>
                    <span className="label-text">Commits</span>
                  </div>
                  
                  {/* Pull requests - Bottom */}
                  <div className="chart-label label-bottom">
                    <span className="label-percentage">{activityOverview.codeReview.pullRequests}%</span>
                    <span className="label-text">Pull requests</span>
                  </div>
                  
                  {/* Issues - Right */}
                  <div className="chart-label label-right">
                    <span className="label-text">Issues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContributionGraph;

