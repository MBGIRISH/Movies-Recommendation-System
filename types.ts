
export interface Movie {
  movieId: number;
  title: string;
  genres: string[];
}

export interface Rating {
  userId: number;
  movieId: number;
  rating: number;
  timestamp: number;
}

export interface Recommendation {
  movieId: number;
  title: string;
  score: number;
  genres: string[];
}

export enum Section {
  Intro = 'Intro',
  DataLoading = 'DataLoading',
  EDA = 'EDA',
  Preprocessing = 'Preprocessing',
  ContentBased = 'ContentBased',
  Collaborative = 'Collaborative',
  Evaluation = 'Evaluation',
  Comparison = 'Comparison',
  BusinessInsights = 'BusinessInsights',
  Conclusion = 'Conclusion'
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
