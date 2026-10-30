import os
from flask import Flask, send_from_directory
from app.config import Config
from app.extensions import db, cors

def create_app(config_class=Config):
    # Locate built frontend if available
    base_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__))) # points to backend/
    root_dir = os.path.dirname(base_dir) # points to project root
    frontend_dist = os.path.join(root_dir, 'frontend', 'dist')

    if os.path.exists(frontend_dist):
        app = Flask(__name__, static_folder=os.path.join(frontend_dist, 'assets'), static_url_path='/assets')
    else:
        app = Flask(__name__)

    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.public_routes import public_bp
    from app.routes.admission_routes import admission_bp
    from app.routes.exam_routes import exam_bp
    from app.routes.fee_routes import fee_bp
    from app.routes.student_routes import student_bp
    from app.routes.parent_routes import parent_bp
    from app.routes.faculty_routes import faculty_bp
    from app.routes.admin_routes import admin_bp
    from app.routes.chatbot_routes import chatbot_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(public_bp)
    app.register_blueprint(admission_bp)
    app.register_blueprint(exam_bp)
    app.register_blueprint(fee_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(parent_bp)
    app.register_blueprint(faculty_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(chatbot_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {
            'status': 'healthy',
            'institution': 'Sri Vidya International Pre-University College',
            'system': 'Smart PU College Academic Management Portal',
            'version': '1.0.0'
        }

    # Serve built frontend single page application for any non-API routes
    if os.path.exists(frontend_dist):
        @app.route('/', defaults={'path': ''})
        @app.route('/<path:path>')
        def serve_frontend(path):
            if path != "" and os.path.exists(os.path.join(frontend_dist, path)):
                return send_from_directory(frontend_dist, path)
            return send_from_directory(frontend_dist, 'index.html')

    # Automatically create tables and seed demo data in application context
    with app.app_context():
        db.create_all()
        from app.utils.seed_data import seed_database
        seed_database()

    return app
