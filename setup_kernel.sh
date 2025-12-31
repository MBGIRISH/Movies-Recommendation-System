#!/bin/bash

# Setup script for Jupyter Notebook Python kernel
# This script creates a virtual environment and installs required packages

echo "Setting up Python environment for Movie Recommendation System..."

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt

# Install the kernel for Jupyter
python -m ipykernel install --user --name=movierec-kernel --display-name="Python (Movie Recommendation)"

echo ""
echo "Setup complete! The kernel 'Python (Movie Recommendation)' should now be available."
echo "Restart Jupyter Notebook and select the new kernel."

