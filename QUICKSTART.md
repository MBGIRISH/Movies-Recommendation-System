# 🚀 Quick Start Guide

Get up and running with the Movie Recommendation System in 5 minutes!

## Prerequisites Check

- [ ] Python 3.8+ installed (`python3 --version`)
- [ ] pip installed (`pip --version`)
- [ ] Jupyter Notebook installed (will be installed automatically)

## Step-by-Step Setup

### 1. Download the Dataset (2 minutes)

1. Visit: https://grouplens.org/datasets/movielens/latest/
2. Download **"ml-latest-small.zip"** (smallest dataset, ~1 MB)
3. Extract the ZIP file
4. Note the location of `movies.csv` and `ratings.csv`

### 2. Set Up Environment (1 minute)

**macOS/Linux:**
```bash
chmod +x setup_kernel.sh
./setup_kernel.sh
```

**Windows:**
```bash
setup_kernel.bat
```

This will:
- Create a Python virtual environment
- Install all required packages
- Register the Jupyter kernel

### 3. Update Data Path (30 seconds)

1. Open `Movie_Recommendation_System.ipynb`
2. Go to **Cell 4** (Load Data)
3. Update the `data_path` variable to point to your dataset location:

```python
# Example paths:
data_path = '/Users/yourname/Downloads/ml-latest-small/'  # macOS/Linux
# OR
data_path = 'C:\\Users\\yourname\\Downloads\\ml-latest-small\\'  # Windows
# OR (if in same folder as notebook)
data_path = './'
```

### 4. Run the Notebook (1 minute)

1. Start Jupyter:
   ```bash
   jupyter notebook
   ```

2. Open `Movie_Recommendation_System.ipynb`

3. Select kernel: **"Python (Movie Recommendation)"**

4. Run all cells: **Cell → Run All**

## ✅ Verification

If everything works, you should see:

- ✅ "Libraries imported successfully!"
- ✅ "Data loaded successfully!"
- ✅ Dataset statistics displayed
- ✅ Visualizations appear
- ✅ Recommendations generated

## 🐛 Troubleshooting

### "Dataset files not found"
- **Solution**: Check that `movies.csv` and `ratings.csv` exist at the `data_path` location
- Verify the path uses forward slashes `/` on macOS/Linux or double backslashes `\\` on Windows

### "No kernel available"
- **Solution**: Run the setup script again:
  ```bash
  ./setup_kernel.sh  # macOS/Linux
  # OR
  setup_kernel.bat   # Windows
  ```
- Then restart Jupyter Notebook

### "Module not found" errors
- **Solution**: Activate the virtual environment and install packages:
  ```bash
  source venv/bin/activate  # macOS/Linux
  # OR
  venv\Scripts\activate     # Windows
  pip install -r requirements.txt
  ```

### Kernel not showing in Jupyter
- **Solution**: 
  1. Refresh the browser page
  2. Restart Jupyter Notebook
  3. Check kernel list: `jupyter kernelspec list`

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the notebook sections
- Try different movies/users for recommendations
- Experiment with the recommendation functions

## 💡 Tips

- Start with a small dataset (ml-latest-small) for faster execution
- The notebook is designed to run cell-by-cell or all at once
- Visualizations will appear inline in the notebook
- Save your work frequently!

---

**Need help?** Open an issue on GitHub or check the main README.md for more details.

