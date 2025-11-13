import { ContributionData, ContributionWeek, ContributionDay } from '../types/contribution.types';

// Helper function to generate contribution level based on count
const getContributionLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

// Generate mock contribution data for the last year
const generateContributionData = (): ContributionData => {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364); // Last 365 days

  let totalContributions = 0;
  let currentWeek: ContributionDay[] = [];

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateString = currentDate.toISOString().split('T')[0];
    
    // Generate random contribution count (weighted towards 0-10)
    const random = Math.random();
    let count = 0;
    
    if (random > 0.7) {
      // 30% chance of having contributions
      count = Math.floor(Math.random() * 15);
    }
    
    totalContributions += count;

    const day: ContributionDay = {
      date: dateString,
      count,
      level: getContributionLevel(count)
    };

    currentWeek.push(day);

    // If it's Sunday or the last day, complete the week
    if (currentDate.getDay() === 6 || i === 364) {
      weeks.push({ days: [...currentWeek] });
      currentWeek = [];
    }
  }

  return {
    totalContributions: 1753, // From the image
    years: [
      {
        year: 2025,
        total: 1753,
        weeks
      },
      {
        year: 2024,
        total: 1542,
        weeks: weeks // Reuse same pattern for demo
      },
      {
        year: 2023,
        total: 1398,
        weeks: weeks
      },
      {
        year: 2022,
        total: 1156,
        weeks: weeks
      },
      {
        year: 2021,
        total: 987,
        weeks: weeks
      },
      {
        year: 2020,
        total: 834,
        weeks: weeks
      },
      {
        year: 2019,
        total: 756,
        weeks: weeks
      },
      {
        year: 2018,
        total: 623,
        weeks: weeks
      },
      {
        year: 2017,
        total: 512,
        weeks: weeks
      },
      {
        year: 2016,
        total: 445,
        weeks: weeks
      },
      {
        year: 2015,
        total: 378,
        weeks: weeks
      },
      {
        year: 2014,
        total: 289,
        weeks: weeks
      },
      {
        year: 2013,
        total: 156,
        weeks: weeks
      }
    ]
  };
};

export const mockContributions: ContributionData = generateContributionData();

