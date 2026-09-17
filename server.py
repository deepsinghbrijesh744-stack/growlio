import os
import sys
import json
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
STATIC_DIR = os.path.join(BASE_DIR, 'static')

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

class GrowlioHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path == '/api/products':
            self.handle_get_products(query)
            return
        elif path == '/api/recipes':
            self.handle_get_recipes(query)
            return
        elif path.startswith('/api/recipes/'):
            recipe_id = path.split('/')[-1]
            self.handle_get_recipe_detail(recipe_id)
            return
        
        if path == '/' or path == '/index.html':
            self.serve_file(os.path.join(BASE_DIR, 'index.html'), 'text/html; charset=utf-8')
            return
        
        file_path = os.path.join(BASE_DIR, path.lstrip('/'))
        if os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            self.serve_file(file_path, mime_type or 'application/octet-stream')
            return

        self.serve_file(os.path.join(BASE_DIR, 'index.html'), 'text/html; charset=utf-8')

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/order':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
            except Exception:
                data = {}
            
            import time
            order_id = f'GRO-{int(time.time()) % 100000:05d}'
            location = data.get('location', 'Phase 3B2, Mohali')
            dark_store = data.get('darkStore', 'Mohali Phase 7 Dark Store #104')
            response_data = {
                'success': True,
                'orderId': order_id,
                'status': 'Order Placed & Packing',
                'deliveryEstimate': '8-10 Mins',
                'location': location,
                'darkStore': dark_store,
                'placedAt': time.strftime('%H:%M:%S'),
                'rider': {
                    'name': 'Gurpreet Singh',
                    'rating': 4.95,
                    'phone': '+91 98765 12345',
                    'vehicle': 'Electric Scooter (CH-01-EV-2024)'
                },
                'itemsCount': len(data.get('items', [])),
                'totalAmount': data.get('totalAmount', 0)
            }
            self.send_json_response(response_data)
            return

        self.send_error(404, 'Endpoint Not Found')

    def handle_get_products(self, query):
        products = load_json('products.json')
        category = query.get('category', [None])[0]
        search = query.get('search', [None])[0]

        if category and category != 'All':
            products = [p for p in products if p.get('category') == category]
        
        if search:
            s = search.lower().strip()
            products = [p for p in products if s in p.get('name', '').lower() or s in p.get('category', '').lower() or (p.get('tricityBrand') and s in p.get('tricityBrand', '').lower())]

        self.send_json_response(products)

    def handle_get_recipes(self, query):
        recipes = load_json('recipes.json')
        category = query.get('category', [None])[0]
        search = query.get('search', [None])[0]

        if category and category != 'All':
            recipes = [r for r in recipes if r.get('category') == category]

        if search:
            s = search.lower().strip()
            recipes = [r for r in recipes if s in r.get('name', '').lower() or s in r.get('category', '').lower() or s in r.get('cuisine', '').lower()]

        self.send_json_response(recipes)

    def handle_get_recipe_detail(self, recipe_id):
        recipes = load_json('recipes.json')
        products = {p['id']: p for p in load_json('products.json')}
        
        recipe = next((r for r in recipes if r['id'] == recipe_id), None)
        if not recipe:
            self.send_error(404, 'Recipe Not Found')
            return

        detailed_ingredients = []
        for ing in recipe.get('ingredients', []):
            ing_copy = dict(ing)
            prod = products.get(ing.get('productId'))
            if prod:
                ing_copy['product'] = prod
            detailed_ingredients.append(ing_copy)
        
        full_recipe = dict(recipe)
        full_recipe['ingredients'] = detailed_ingredients
        self.send_json_response(full_recipe)

    def send_json_response(self, data, status=200):
        body = json.dumps(data, indent=2).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def serve_file(self, filepath, content_type):
        if not os.path.exists(filepath):
            self.send_error(404, 'File Not Found')
            return
        try:
            with open(filepath, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f'Server Error: {str(e)}')

def run_server(port=8000):
    server_address = ('', port)
    httpd = ThreadingHTTPServer(server_address, GrowlioHandler)
    print(f'Growlio Tricity Server running at http://localhost:{port}/')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server...')
        httpd.server_close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)
