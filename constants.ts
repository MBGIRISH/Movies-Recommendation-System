
import { Movie, Rating } from './types';

export const MOCK_MOVIES: Movie[] = [
  { movieId: 1, title: "Toy Story (1995)", genres: ["Adventure", "Animation", "Children", "Comedy", "Fantasy"] },
  { movieId: 2, title: "Jumanji (1995)", genres: ["Adventure", "Children", "Fantasy"] },
  { movieId: 3, title: "Grumpier Old Men (1995)", genres: ["Comedy", "Romance"] },
  { movieId: 6, title: "Heat (1995)", genres: ["Action", "Crime", "Thriller"] },
  { movieId: 10, title: "GoldenEye (1995)", genres: ["Action", "Adventure", "Thriller"] },
  { movieId: 32, title: "Twelve Monkeys (a.k.a. 12 Monkeys) (1995)", genres: ["Mystery", "Sci-Fi", "Thriller"] },
  { movieId: 47, title: "Seven (a.k.a. Se7en) (1995)", genres: ["Mystery", "Thriller"] },
  { movieId: 50, title: "Usual Suspects, The (1995)", genres: ["Crime", "Mystery", "Thriller"] },
  { movieId: 110, title: "Braveheart (1995)", genres: ["Action", "Drama", "War"] },
  { movieId: 150, title: "Apollo 13 (1995)", genres: ["Adventure", "Drama", "IMAX"] },
  { movieId: 260, title: "Star Wars: Episode IV - A New Hope (1977)", genres: ["Action", "Adventure", "Sci-Fi"] },
  { movieId: 296, title: "Pulp Fiction (1994)", genres: ["Comedy", "Crime", "Drama", "Thriller"] },
  { movieId: 318, title: "Shawshank Redemption, The (1994)", genres: ["Crime", "Drama"] },
  { movieId: 356, title: "Forrest Gump (1994)", genres: ["Comedy", "Drama", "Romance", "War"] },
  { movieId: 480, title: "Jurassic Park (1993)", genres: ["Action", "Adventure", "Sci-Fi", "Thriller"] },
  { movieId: 527, title: "Schindler's List (1993)", genres: ["Drama", "War"] },
  { movieId: 589, title: "Terminator 2: Judgment Day (1991)", genres: ["Action", "Sci-Fi"] },
  { movieId: 593, title: "Silence of the Lambs, The (1991)", genres: ["Crime", "Horror", "Thriller"] },
  { movieId: 780, title: "Independence Day (a.k.a. ID4) (1996)", genres: ["Action", "Adventure", "Sci-Fi", "Thriller"] },
  { movieId: 858, title: "Godfather, The (1972)", genres: ["Crime", "Drama"] },
  { movieId: 1196, title: "Star Wars: Episode V - The Empire Strikes Back (1980)", genres: ["Action", "Adventure", "Sci-Fi"] },
  { movieId: 1198, title: "Raiders of the Lost Ark (Indiana Jones and the Raiders of the Lost Ark) (1981)", genres: ["Action", "Adventure"] },
  { movieId: 1210, title: "Star Wars: Episode VI - Return of the Jedi (1983)", genres: ["Action", "Adventure", "Sci-Fi"] },
  { movieId: 1270, title: "Back to the Future (1985)", genres: ["Adventure", "Comedy", "Sci-Fi"] },
  { movieId: 2028, title: "Saving Private Ryan (1998)", genres: ["Action", "Drama", "War"] },
  { movieId: 2571, title: "Matrix, The (1999)", genres: ["Action", "Sci-Fi", "Thriller"] },
  { movieId: 2762, title: "Sixth Sense, The (1999)", genres: ["Drama", "Horror", "Mystery"] },
  { movieId: 2858, title: "American Beauty (1999)", genres: ["Drama", "Romance"] },
  { movieId: 2959, title: "Fight Club (1999)", genres: ["Action", "Crime", "Drama", "Thriller"] },
  { movieId: 4226, title: "Memento (2000)", genres: ["Mystery", "Thriller"] },
  { movieId: 4993, title: "Lord of the Rings: The Fellowship of the Ring, The (2001)", genres: ["Adventure", "Fantasy"] },
  { movieId: 5952, title: "Lord of the Rings: The Two Towers, The (2002)", genres: ["Adventure", "Fantasy"] },
  { movieId: 7153, title: "Lord of the Rings: The Return of the King, The (2003)", genres: ["Action", "Adventure", "Drama", "Fantasy"] },
  { movieId: 58559, title: "Dark Knight, The (2008)", genres: ["Action", "Crime", "Drama", "IMAX"] },
  { movieId: 79132, title: "Inception (2010)", genres: ["Action", "Crime", "Drama", "Mystery", "Sci-Fi", "Thriller", "IMAX"] }
];

export const MOCK_RATINGS: Rating[] = Array.from({ length: 500 }, (_, i) => ({
  userId: Math.floor(i / 10) + 1,
  movieId: MOCK_MOVIES[Math.floor(Math.random() * MOCK_MOVIES.length)].movieId,
  rating: Number((Math.random() * 2 + 3).toFixed(1)), // Scale 3.0 to 5.0 for better visuals
  timestamp: 1260759144 + i * 100
}));

export const SECTIONS = [
  { id: 'Intro', label: '1. Introduction' },
  { id: 'DataLoading', label: '2. Data Import' },
  { id: 'EDA', label: '3. EDA & Visualization' },
  { id: 'Preprocessing', label: '4. Data Preprocessing' },
  { id: 'ContentBased', label: '5. Content-Based System' },
  { id: 'Collaborative', label: '6. Collaborative Filtering' },
  { id: 'Evaluation', label: '7. Model Evaluation' },
  { id: 'Comparison', label: '8. Approach Comparison' },
  { id: 'BusinessInsights', label: '9. Business Strategy' },
  { id: 'Conclusion', label: '10. Summary & Next Steps' }
];
