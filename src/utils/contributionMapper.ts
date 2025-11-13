import { ContributionData, Week, Day } from '../types/contribution.types';

/**
 * Maps GitHub GraphQL contributions data to our ContributionData format
 * Generates data for the last 12 months starting from current month
 */
export const mapGitHubContributionsToData = (graphqlData: any): ContributionData => {
  if (!graphqlData?.data?.user?.contributionsCollection) {
    throw new Error('Invalid contributions data');
  }

  const calendar = graphqlData.data.user.contributionsCollection.contributionCalendar;
  const weeks: Week[] = [];
  
  // Process each week from GitHub data
  calendar.weeks.forEach((week: any) => {
    const days: Day[] = week.contributionDays.map((day: any) => {
      // Convert contribution count to level (0-4)
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      const count = day.contributionCount;
      
      if (count === 0) level = 0;
      else if (count <= 3) level = 1;
      else if (count <= 6) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;

      return {
        date: day.date,
        count: day.contributionCount,
        level
      };
    });

    weeks.push({ days });
  });

  const currentYear = new Date().getFullYear();

  // Generate multiple years for the timeline (even though we only have data for one year)
  const years = [];
  for (let year = currentYear; year >= 2013; year--) {
    years.push({
      year: year,
      total: year === currentYear ? calendar.totalContributions : 0,
      range: {
        start: weeks[0]?.days[0]?.date || '',
        end: weeks[weeks.length - 1]?.days[weeks[weeks.length - 1].days.length - 1]?.date || ''
      },
      weeks: year === currentYear ? weeks : []
    });
  }

  return {
    totalContributions: calendar.totalContributions,
    years
  };
};

/**
 * Generates consistent mock contribution data for fallback
 * Creates last 12 months of data with consistent patterns
 */
export const generateMockContributions = (): ContributionData => {
  const weeks: Week[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);
  startDate.setDate(today.getDate() + 1); // Start from day after one year ago
  
  // Start from the Sunday of the week containing startDate
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  let totalContributions = 0;
  let currentDate = new Date(startDate);

  // Generate weeks until we reach today (up to 54 weeks to cover full year)
  let weekIndex = 0;
  while (weekIndex < 54 && currentDate <= today) {
    const days: Day[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Only include days up to today
      if (currentDate > today) {
        break;
      }

      // Generate consistent contribution count based on date
      // Use date as seed for consistency
      const dateString = currentDate.toISOString().split('T')[0];
      const seed = dateString.split('-').reduce((acc, num) => acc + parseInt(num), 0);
      const pseudoRandom = (seed * 9301 + 49297) % 233280 / 233280;
      
      let count = 0;
      
      // 20% chance of no contributions
      if (pseudoRandom > 0.2) {
        // Generate count based on day of week (weekdays have more contributions)
        const dayOfWeek = currentDate.getDay();
        const weekdayMultiplier = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 1.5 : 0.7;
        count = Math.floor((pseudoRandom * 15) * weekdayMultiplier);
      }

      totalContributions += count;

      // Determine level based on count
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 0) level = 0;
      else if (count <= 3) level = 1;
      else if (count <= 6) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;

      days.push({
        date: dateString,
        count,
        level
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (days.length > 0) {
      weeks.push({ days });
    }
    weekIndex++;
  }

  const currentYear = new Date().getFullYear();

  return {
    totalContributions,
    years: [
      {
        year: currentYear,
        total: totalContributions,
        range: {
          start: weeks[0]?.days[0]?.date || '',
          end: weeks[weeks.length - 1]?.days[weeks[weeks.length - 1].days.length - 1]?.date || ''
        },
        weeks
      }
    ]
  };
};

