@echo off
REM Setup script for Jupyter Notebook Python kernel (Windows)
REM This script creates a virtual environment and installs required packages

echo Setting up Python environment for Movie Recommendation System...

REM Create virtual environment
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Upgrade pip
python -m pip install --upgrade pip

REM Install required packages
pip install -r requirements.txt

REM Install the kernel for Jupyter
python -m ipykernel install --user --name=movierec-kernel --display-name="Python (Movie Recommendation)"

echo.
echo Setup complete! The kernel 'Python (Movie Recommendation)' should now be available.
echo Restart Jupyter Notebook and select the new kernel.

pause

