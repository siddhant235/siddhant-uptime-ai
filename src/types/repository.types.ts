export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: {
    name: string;
    color: string;
  };
  visibility: 'Public' | 'Private';
  forkedFrom?: {
    owner: string;
    repo: string;
    url: string;
  };
  stars: number;
  forks: number;
  url: string;
}

