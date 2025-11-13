import React from 'react';
import { Repository } from '../../types/repository.types';
import { ContributionData } from '../../types/contribution.types';
import { Activity, ActivityOverview } from '../../types/activity.types';
import PopularRepositories from './PopularRepositories/PopularRepositories';
import ContributionGraph from './ContributionGraph/ContributionGraph';
import ActivityOverviewComponent from './ActivityOverview/ActivityOverview';
import ContributionActivity from './ContributionActivity/ContributionActivity';
import './MainContent.css';

interface MainContentProps {
  repositories: Repository[];
  contributions: ContributionData;
  activities: Activity[];
  activityOverview: ActivityOverview;
}

const MainContent: React.FC<MainContentProps> = ({
  repositories,
  contributions,
  activities,
  activityOverview
}) => {
  return (
    <main className="main-content">
      <PopularRepositories repositories={repositories} />
      <ContributionGraph contributionData={contributions} activityOverview={activityOverview} />
      <ContributionActivity activities={activities} />
    </main>
  );
};

export default MainContent;

