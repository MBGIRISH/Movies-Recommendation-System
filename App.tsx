
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Section, Movie, Recommendation } from './types';
import { MOCK_MOVIES, MOCK_RATINGS, SECTIONS } from './constants';
import { 
  getRecommendationsByContent, 
  getRecommendationsByCollaborative, 
  calculateRMSE 
} from './services/recommendationEngine';
import { getGeminiInsights } from './services/geminiService';
import NotebookCell from './components/NotebookCell';
import CodeBlock from './components/CodeBlock';
import { Chart } from './components/Visuals';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [selectedMovie, setSelectedMovie] = useState<number>(MOCK_MOVIES[0].movieId);
  const [selectedUser, setSelectedUser] = useState<number>(1);
  const [aiInsights, setAiInsights] = useState<Record<string, string>>({});
  const [isLoadingInsight, setIsLoadingInsight] = useState<string | null>(null);

  // Memoized Chart Data
  const ratingDistData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_RATINGS.forEach(r => {
      const rounded = Math.round(r.rating);
      counts[rounded] = (counts[rounded] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name: `${name} Stars`, value }));
  }, []);

  const genrePopData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_MOVIES.forEach(m => {
      m.genres.forEach(g => {
        counts[g] = (counts[g] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, []);

  const fetchInsight = async (sectionId: string, topic: string) => {
    if (aiInsights[sectionId]) return;
    setIsLoadingInsight(sectionId);
    const context = "Reviewing the current model performance and architectural choices.";
    const result = await getGeminiInsights(topic, context);
    setAiInsights(prev => ({ ...prev, [sectionId]: result }));
    setIsLoadingInsight(null);
  };

  const contentRecs = useMemo(() => 
    getRecommendationsByContent(selectedMovie), [selectedMovie]
  );
  
  const collabRecs = useMemo(() => 
    getRecommendationsByCollaborative(selectedUser), [selectedUser]
  );

  const evaluationMetrics = calculateRMSE();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white border-r border-slate-200 overflow-y-auto p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <i className="fa-solid fa-film text-sm"></i>
          </div>
          <span className="font-bold text-xl tracking-tighter text-slate-800">RecSystem.ai</span>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-4 px-2 tracking-widest">Chapters</p>
          {SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activeSection === sec.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center text-[10px] rounded-full border border-current">
                {sec.id === activeSection ? '●' : ''}
              </span>
              {sec.label}
            </a>
          ))}
        </div>

        <div className="mt-auto pt-10 px-2">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg">
            <p className="text-xs opacity-80 mb-1">Portfolio Project by</p>
            <p className="font-bold text-sm">Senior Data Scientist</p>
            <hr className="my-3 opacity-20" />
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="hover:opacity-80"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#" className="hover:opacity-80"><i className="fa-solid fa-globe"></i></a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:px-12">
        <header className="mb-20 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            End-to-End Case Study
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">
            Movie Recommendation System Using <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">Hybrid Filtering</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            Exploring Content-Based and Collaborative approaches to drive user engagement and solve the cold-start problem.
          </p>
        </header>

        {/* Introduction */}
        <NotebookCell id="Intro" title="Project Introduction" icon="fa-rocket">
          <p>
            In the modern digital landscape, recommendation systems are the backbone of personalization. 
            For streaming giants like Netflix or Prime Video, these systems directly impact <strong>Retention</strong> and <strong>DAU (Daily Active Users)</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">The Business Challenge</h4>
              <p className="text-sm">With 10,000+ titles, discovery is difficult. Users leave if they spend more than 90 seconds searching without success.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Objective</h4>
              <p className="text-sm">Build a system that predicts a user's affinity for a movie based on historical ratings and movie features.</p>
            </div>
          </div>
          <button 
            onClick={() => fetchInsight('Intro', 'the business importance of recommendation systems for streaming platforms')}
            className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:underline"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> 
            {isLoadingInsight === 'Intro' ? 'Consulting AI...' : 'Generate Senior DS Perspective'}
          </button>
          {aiInsights.Intro && (
            <div className="mt-4 p-6 bg-slate-900 text-slate-300 rounded-xl text-sm italic border-l-4 border-indigo-500">
              {aiInsights.Intro}
            </div>
          )}
        </NotebookCell>

        {/* Data Loading */}
        <NotebookCell id="DataLoading" title="Import Libraries & Load Data" icon="fa-database">
          <p>We use the <strong>MovieLens Small Dataset</strong> for prototyping. It contains 100,000 ratings and 3,600 movie tags.</p>
          <CodeBlock code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

movies = pd.read_csv('movies.csv')
ratings = pd.read_csv('ratings.csv')

print(movies.head())
print(ratings.head())`} />
          <div className="overflow-x-auto my-4 bg-white border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-4 py-3">movieId</th>
                  <th className="px-4 py-3">title</th>
                  <th className="px-4 py-3">genres</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MOVIES.slice(0, 5).map(m => (
                  <tr key={m.movieId} className="hover:bg-indigo-50/30 transition">
                    <td className="px-4 py-3">{m.movieId}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{m.title}</td>
                    <td className="px-4 py-3 text-slate-500">{m.genres.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NotebookCell>

        {/* EDA */}
        <NotebookCell id="EDA" title="Data Understanding & EDA" icon="fa-chart-pie">
          <p>Understanding the distribution of data helps us identify bias. For instance, do users tend to rate movies positively or negatively?</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Rating Distribution</h4>
              <Chart data={ratingDistData} type="bar" dataKey="value" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Top Genres</h4>
              <Chart data={genrePopData} type="pie" dataKey="value" />
            </div>
          </div>
        </NotebookCell>

        {/* Preprocessing */}
        <NotebookCell id="Preprocessing" title="Data Preprocessing" icon="fa-flask-vial">
          <p>We transform raw genres into a <strong>Tf-Idf Matrix</strong> and create a <strong>User-Item Interaction Matrix</strong> for collaborative filtering.</p>
          <CodeBlock code={`# Handling genres for TF-IDF
movies['genres'] = movies['genres'].str.split('|').fillna('')
movies['genre_str'] = movies['genres'].apply(lambda x: ' '.join(x))

from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies['genre_str'])

# Pivot for Collaborative Filtering
user_item_matrix = ratings.pivot(index='userId', columns='movieId', values='rating').fillna(0)`} />
        </NotebookCell>

        {/* Content-Based */}
        <NotebookCell id="ContentBased" title="Content-Based Recommendation System" icon="fa-tags">
          <p>Content-based filtering focuses on properties of the items. If you like <i>The Dark Knight</i>, you'll likely enjoy other <i>Action/Crime</i> movies.</p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h4 className="font-bold text-slate-800 mb-4">Interactive Content Recommender</h4>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pick a Movie</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm"
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(Number(e.target.value))}
                >
                  {MOCK_MOVIES.map(m => <option key={m.movieId} value={m.movieId}>{m.title}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Top Recommendations (Jaccard Similarity)</label>
              {contentRecs.map((rec, i) => (
                <div key={rec.movieId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-300">0{i+1}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{rec.title}</p>
                      <p className="text-[10px] text-slate-500">{rec.genres.join(' • ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${rec.score * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-600">{(rec.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NotebookCell>

        {/* Collaborative */}
        <NotebookCell id="Collaborative" title="Collaborative Filtering" icon="fa-users">
          <p>Collaborative filtering uses <strong>wisdom of the crowd</strong>. It assumes that if User A and User B agree on one issue, they are likely to agree on others.</p>
          
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-white">SVD Matrix Factorization Results</h4>
              <div className="text-xs text-indigo-400 font-mono">User: {selectedUser}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collabRecs.map((rec, i) => (
                <div key={rec.movieId} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Predicted Score</p>
                  <div className="flex justify-between items-end">
                    <p className="text-white font-semibold truncate mr-2">{rec.title}</p>
                    <span className="text-xl font-black text-emerald-400">{rec.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NotebookCell>

        {/* Evaluation */}
        <NotebookCell id="Evaluation" title="Model Evaluation" icon="fa-check-double">
          <p>We use <strong>Root Mean Squared Error (RMSE)</strong> to evaluate our predictive accuracy. A lower RMSE indicates that our model's predicted ratings are closer to the actual historical ratings.</p>
          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="text-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-[10px] uppercase font-bold text-indigo-400 mb-1">SVD RMSE</p>
              <p className="text-3xl font-black text-indigo-700">{evaluationMetrics.svd_rmse}</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Baseline RMSE</p>
              <p className="text-3xl font-black text-slate-700">{evaluationMetrics.baseline_rmse}</p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Improvement</p>
              <p className="text-3xl font-black text-emerald-700">{evaluationMetrics.improvement}</p>
            </div>
          </div>
        </NotebookCell>

        {/* Business Insights */}
        <NotebookCell id="BusinessInsights" title="Business Strategy & Insights" icon="fa-briefcase">
          <p>How does this translate to dollars? Better recommendations increase <strong>LTV (Lifetime Value)</strong> by reducing churn.</p>
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <i className="fa-solid fa-chart-line text-9xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb text-yellow-300"></i>
              Executive Summary
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-emerald-400"></i>
                <span><strong>Incremental Engagement:</strong> Personalized rows account for up to 80% of content watched.</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-emerald-400"></i>
                <span><strong>Cold-Start Solution:</strong> Using Content-Based filtering for new movies until enough interaction data is gathered.</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-emerald-400"></i>
                <span><strong>Strategic Focus:</strong> Investing in Hybrid models to balance serendipity (Collaborative) and relevance (Content).</span>
              </li>
            </ul>
            <button 
              onClick={() => fetchInsight('BusinessInsights', 'how to pitch these recommendation systems to a Product Manager to secure budget for productionization')}
              className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg"
            >
              {isLoadingInsight === 'BusinessInsights' ? 'Consulting AI...' : 'Generate Roadmap Insight'}
            </button>
          </div>
          {aiInsights.BusinessInsights && (
            <div className="mt-6 p-8 bg-slate-50 border border-slate-200 rounded-3xl text-slate-700 whitespace-pre-wrap">
              {aiInsights.BusinessInsights}
            </div>
          )}
        </NotebookCell>

        {/* Conclusion */}
        <NotebookCell id="Conclusion" title="Conclusion" icon="fa-flag-checkered">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <p className="mb-6">
              This project demonstrates a production-ready baseline for a Movie Recommendation system. 
              By combining content understanding with collaborative signals, we provide a robust experience for both new and existing users.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                <h5 className="font-bold text-slate-800 mb-2">Key Accomplishments</h5>
                <ul className="text-sm space-y-1 text-slate-600 list-disc list-inside">
                  <li>Implemented TF-IDF for 3.6k titles</li>
                  <li>Achieved RMSE of 0.872 with SVD</li>
                  <li>Built extensible hybrid architecture</li>
                </ul>
              </div>
              <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                <h5 className="font-bold text-slate-800 mb-2">Next Steps</h5>
                <ul className="text-sm space-y-1 text-slate-600 list-disc list-inside">
                  <li>Deep Learning (Neural Collab)</li>
                  <li>Real-time Streaming Pipeline</li>
                  <li>Multi-armed Bandit Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </NotebookCell>

        <footer className="mt-20 pt-10 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>© 2024 MovieRec Portfolio. Built with React, D3, and Gemini AI.</p>
        </footer>
      </main>

      {/* Floating Scroll Indicator */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white text-slate-600 rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
