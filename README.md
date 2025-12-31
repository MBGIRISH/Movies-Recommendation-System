# 🎬 Movie Recommendation System

A comprehensive, end-to-end Movie Recommendation System using **Content-Based Filtering** and **Collaborative Filtering** techniques. This is a professional Data Science portfolio project demonstrating machine learning skills, data analysis, and business-oriented insights.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Dataset](#dataset)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Approaches Implemented](#approaches-implemented)
- [Results](#results)
- [Business Insights](#business-insights)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project implements a complete movie recommendation system that helps users discover movies based on their preferences. The system uses two complementary approaches:

1. **Content-Based Filtering**: Recommends movies similar to those a user has liked, based on movie features (genres)
2. **Collaborative Filtering**: Recommends movies based on preferences of similar users using matrix factorization (SVD)

### Business Value

- **User Engagement**: Reduces decision fatigue by providing personalized recommendations
- **Retention**: Improves user satisfaction leading to higher retention rates
- **Revenue Impact**: Companies like Netflix report 80% of content watched comes from recommendations
- **Content Discovery**: Helps users discover niche movies they wouldn't find otherwise

---

## ✨ Features

- ✅ **Content-Based Recommendations**: Uses TF-IDF vectorization and cosine similarity
- ✅ **Collaborative Filtering**: Implements SVD matrix factorization for user-based recommendations
- ✅ **Comprehensive EDA**: Detailed exploratory data analysis with visualizations
- ✅ **Model Evaluation**: RMSE and MAE metrics for performance assessment
- ✅ **Production-Ready Functions**: Clean, reusable recommendation functions
- ✅ **Business Insights**: Analysis of business impact and deployment considerations
- ✅ **Professional Documentation**: Well-structured Jupyter notebook with markdown explanations

---

## 🛠 Technologies Used

### Core Libraries
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computations
- **Matplotlib & Seaborn**: Data visualization
- **Scikit-learn**: Machine learning algorithms
  - TF-IDF Vectorization
  - Cosine Similarity
  - Truncated SVD (Singular Value Decomposition)
  - Train-Test Split
  - Evaluation Metrics

### Development Tools
- **Jupyter Notebook**: Interactive development environment
- **Python 3.8+**: Programming language

---

## 📊 Dataset

This project uses the **MovieLens Latest Small Dataset** which contains:

- **movies.csv**: Movie metadata (movieId, title, genres)
- **ratings.csv**: User ratings (userId, movieId, rating, timestamp)

### Dataset Statistics
- ~9,742 movies
- ~610 users
- ~100,836 ratings
- Rating scale: 0.5 to 5.0 stars (in 0.5 increments)

### Download Dataset

1. Visit [MovieLens Dataset](https://grouplens.org/datasets/movielens/latest/)
2. Download the "ml-latest-small.zip" file
3. Extract the archive
4. Place `movies.csv` and `ratings.csv` in your desired directory
5. Update the `data_path` variable in the notebook (Cell 4)

**Note**: The notebook currently expects the dataset at `/Users/mbgirish/Downloads/archive-5/`. Update this path to match your dataset location.

---

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Jupyter Notebook or JupyterLab

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Movie-Recommendation-System
```

### Step 2: Set Up Python Environment

#### Option A: Automated Setup (Recommended)

**For macOS/Linux:**
```bash
chmod +x setup_kernel.sh
./setup_kernel.sh
```

**For Windows:**
```bash
setup_kernel.bat
```

#### Option B: Manual Setup

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Jupyter kernel
python -m ipykernel install --user --name=movierec-kernel --display-name="Python (Movie Recommendation)"
```

### Step 3: Verify Installation

Run the validation script to check if everything is set up correctly:

```bash
# Activate virtual environment first
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Run validation
python validate_setup.py
```

This will verify all packages are installed and the Jupyter kernel is registered.

### Step 4: Download Dataset

1. Download the MovieLens dataset (see [Dataset](#dataset) section)
2. Extract and place `movies.csv` and `ratings.csv` in a directory
3. Update the `data_path` in the notebook (Cell 4)

---

## 📖 Usage

### Running the Notebook

1. **Start Jupyter Notebook:**
   ```bash
   jupyter notebook
   ```
   Or use JupyterLab:
   ```bash
   jupyter lab
   ```

2. **Open the Notebook:**
   - Open `Movie_Recommendation_System.ipynb`

3. **Select Kernel:**
   - When prompted, select **"Python (Movie Recommendation)"** kernel
   - Or go to: Kernel → Change Kernel → Python (Movie Recommendation)

4. **Run All Cells:**
   - Go to: Cell → Run All
   - Or run cells individually using Shift + Enter

### Using the Recommendation Functions

#### Content-Based Recommendations

```python
# Get recommendations for a movie
recommendations = recommend_movies_content_based("Toy Story (1995)", top_n=10)
print(recommendations)
```

#### Collaborative Filtering Recommendations

```python
# Get recommendations for a user
recommendations = recommend_movies_collaborative(user_id=1, top_n=10)
print(recommendations)
```

---

## 📁 Project Structure

```
Movie-Recommendation-System/
│
├── Movie_Recommendation_System.ipynb  # Main Jupyter notebook
├── requirements.txt                    # Python dependencies
├── setup_kernel.sh                     # Setup script (macOS/Linux)
├── setup_kernel.bat                    # Setup script (Windows)
├── validate_setup.py                   # Setup validation script
├── README.md                           # Comprehensive documentation
├── QUICKSTART.md                       # Quick start guide
├── PROJECT_SUMMARY.md                  # Project overview
├── LICENSE                             # MIT License
├── .gitignore                          # Git ignore rules
│
├── venv/                               # Virtual environment (created during setup)
│
└── [Dataset Directory]/                # Your dataset location
    ├── movies.csv
    └── ratings.csv
```

---

## 🔬 Approaches Implemented

### 1. Content-Based Filtering

**How it works:**
- Extracts movie genres as features
- Applies TF-IDF vectorization to convert genres into numerical features
- Computes cosine similarity between movies
- Recommends movies with highest similarity scores

**Advantages:**
- ✅ No cold start problem for new items
- ✅ Provides explainable recommendations
- ✅ Works well for niche items

**Limitations:**
- ❌ Limited by available features
- ❌ May create "filter bubbles"
- ❌ Can't discover new interests

### 2. Collaborative Filtering

**How it works:**
- Creates user-item rating matrix
- Applies Singular Value Decomposition (SVD) for dimensionality reduction
- Reconstructs matrix to predict missing ratings
- Recommends movies with highest predicted ratings

**Advantages:**
- ✅ Discovers new interests
- ✅ No need for item features
- ✅ Works well with large user bases

**Limitations:**
- ❌ Cold start problem (new users/items)
- ❌ Requires sufficient user interaction data
- ❌ Can't explain recommendations

### Model Evaluation

- **RMSE (Root Mean Squared Error)**: Measures prediction accuracy
- **MAE (Mean Absolute Error)**: Average prediction error
- **Visualizations**: Predicted vs Actual ratings, residual plots

---

## 📈 Results

### Model Performance

- **Content-Based**: Provides genre-based similarity recommendations
- **Collaborative Filtering**: Achieves low RMSE on test set (typically < 1.0)

### Key Insights

1. **Rating Distribution**: Most ratings are positive (3.5-4.5 stars)
2. **Popular Movies**: Blockbusters receive most ratings
3. **Genre Preferences**: Drama and Comedy are most common
4. **User Behavior**: Power users rate significantly more movies

---

## 💼 Business Insights

### Impact on User Engagement

- **Reduced Decision Fatigue**: Recommendations narrow down choices
- **Increased Watch Time**: Relevant content keeps users engaged
- **Better Retention**: Personalized experience improves satisfaction
- **Content Discovery**: Helps users find niche content

### Production Deployment Considerations

1. **Real-Time Recommendations**: Pre-compute similarity matrices
2. **Scalability**: Use distributed computing for large user bases
3. **A/B Testing**: Continuously optimize based on metrics
4. **Monitoring**: Track accuracy and user engagement
5. **Privacy & Ethics**: Ensure diverse recommendations

---

## 🔮 Future Improvements

1. **Hybrid Model**: Combine content-based and collaborative filtering
2. **Deep Learning**: Neural Collaborative Filtering, Autoencoders
3. **Feature Engineering**: Include cast, director, plot keywords
4. **Advanced Techniques**: ALS, Factorization Machines, Graph-based recommendations
5. **Real-World Enhancements**: 
   - Implicit feedback (views, clicks)
   - Time-based recommendations
   - Context-aware recommendations
   - Multi-armed bandit for exploration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**M B GIRISH**

- This project demonstrates professional data science skills including:
  - Data preprocessing and EDA
  - Feature engineering
  - Machine learning model implementation
  - Model evaluation
  - Business-oriented thinking

---

## 🙏 Acknowledgments

- [MovieLens Dataset](https://grouplens.org/datasets/movielens/) by GroupLens Research
- Scikit-learn documentation
- Jupyter Project

---

## 📞 Contact & Support

**Email:** [mbgirish2004@gmail.com](mailto:mbgirish2004@gmail.com)

For questions, issues, or collaboration opportunities, please:
- Email: mbgirish2004@gmail.com
- Open an issue on GitHub

---

**⭐ If you found this project helpful, please consider giving it a star!**

---

## 📚 Additional Resources

- [MovieLens Dataset Documentation](https://grouplens.org/datasets/movielens/)
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Jupyter Notebook Documentation](https://jupyter-notebook.readthedocs.io/)

---

*Last updated: 2025*
