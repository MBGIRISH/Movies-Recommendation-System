#!/usr/bin/env python3
"""
Validation script to check if the Movie Recommendation System setup is correct.
Run this script to verify all dependencies are installed and the environment is ready.
"""

import sys
import importlib

def check_package(package_name, import_name=None):
    """Check if a package is installed."""
    if import_name is None:
        import_name = package_name
    
    try:
        importlib.import_module(import_name)
        print(f"✅ {package_name} is installed")
        return True
    except ImportError:
        print(f"❌ {package_name} is NOT installed")
        return False

def check_jupyter_kernel():
    """Check if the Jupyter kernel is installed."""
    try:
        import subprocess
        result = subprocess.run(['jupyter', 'kernelspec', 'list'], 
                              capture_output=True, text=True, timeout=10)
        if 'movierec-kernel' in result.stdout:
            print("✅ Jupyter kernel 'movierec-kernel' is installed")
            return True
        else:
            print("⚠️  Jupyter kernel 'movierec-kernel' is NOT found")
            print("   Run: ./setup_kernel.sh (macOS/Linux) or setup_kernel.bat (Windows)")
            return False
    except Exception as e:
        print(f"⚠️  Could not check Jupyter kernel: {e}")
        return False

def main():
    """Main validation function."""
    print("=" * 60)
    print("Movie Recommendation System - Setup Validation")
    print("=" * 60)
    print()
    
    # Required packages
    packages = [
        ('pandas', 'pandas'),
        ('numpy', 'numpy'),
        ('matplotlib', 'matplotlib'),
        ('seaborn', 'seaborn'),
        ('scikit-learn', 'sklearn'),
        ('jupyter', 'jupyter'),
        ('ipykernel', 'ipykernel'),
    ]
    
    print("Checking required packages...")
    print("-" * 60)
    
    all_installed = True
    for package_name, import_name in packages:
        if not check_package(package_name, import_name):
            all_installed = False
    
    print()
    print("Checking Jupyter kernel...")
    print("-" * 60)
    kernel_installed = check_jupyter_kernel()
    
    print()
    print("=" * 60)
    if all_installed and kernel_installed:
        print("✅ All checks passed! Setup is complete.")
        print()
        print("Next steps:")
        print("1. Download the MovieLens dataset from:")
        print("   https://grouplens.org/datasets/movielens/latest/")
        print("2. Update the data_path in the notebook (Cell 4)")
        print("3. Open the notebook: jupyter notebook")
        print("4. Select kernel: 'Python (Movie Recommendation)'")
        return 0
    else:
        print("❌ Some checks failed. Please install missing packages.")
        print()
        print("To fix:")
        print("1. Activate virtual environment:")
        print("   source venv/bin/activate  # macOS/Linux")
        print("   venv\\Scripts\\activate     # Windows")
        print("2. Install packages: pip install -r requirements.txt")
        print("3. Run setup script: ./setup_kernel.sh")
        return 1

if __name__ == "__main__":
    sys.exit(main())

