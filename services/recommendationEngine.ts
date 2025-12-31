
import { Movie, Rating, Recommendation } from '../types';
import { MOCK_MOVIES, MOCK_RATINGS } from '../constants';

/**
 * Simplified Content-Based Filtering using Genre Jaccard Similarity
 */
export const getRecommendationsByContent = (movieId: number, topN: number = 5): Recommendation[] => {
  const targetMovie = MOCK_MOVIES.find(m => m.movieId === movieId);
  if (!targetMovie) return [];

  const scores = MOCK_MOVIES
    .filter(m => m.movieId !== movieId)
    .map(movie => {
      const intersection = movie.genres.filter(g => targetMovie.genres.includes(g));
      const union = Array.from(new Set([...movie.genres, ...targetMovie.genres]));
      const score = intersection.length / union.length;
      return { ...movie, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scores;
};

/**
 * Simplified Collaborative Filtering (Item-User Interaction based)
 * We simulate a latent factor similarity approach.
 */
export const getRecommendationsByCollaborative = (userId: number, topN: number = 5): Recommendation[] => {
  // Find movies the user has NOT watched
  const userRatings = MOCK_RATINGS.filter(r => r.userId === userId);
  const watchedMovieIds = new Set(userRatings.map(r => r.movieId));

  // For unobserved movies, predict rating using "Global Average + Item Bias" mock logic
  // Real SVD would be used here in a Python environment
  const recommendations = MOCK_MOVIES
    .filter(m => !watchedMovieIds.has(m.movieId))
    .map(movie => {
      const avgRating = 3.5;
      const popularityBonus = Math.random() * 1.5; // Simulate latent affinity
      return {
        ...movie,
        score: Number((avgRating + popularityBonus).toFixed(1))
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return recommendations;
};

export const calculateRMSE = () => {
  // Mocking the result of a 5-fold cross-validation
  return {
    svd_rmse: 0.872,
    baseline_rmse: 1.054,
    improvement: "17.2%"
  };
};
