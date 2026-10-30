import sys
import os

# Add backend directory to sys.path
root_dir = os.path.abspath(os.path.dirname(__file__))
backend_dir = os.path.join(root_dir, 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("=" * 70)
    print(" Sri Vidya International Pre-University College Portal")
    print(" Server active at: http://localhost:5000")
    print(" (Serving both API endpoints /api/* and full React SPA frontend)")
    print("=" * 70)
    app.run(host='0.0.0.0', port=5000, debug=False)

