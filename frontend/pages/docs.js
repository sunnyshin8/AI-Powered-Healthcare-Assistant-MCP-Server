import Navbar from '../components/Navbar';

export default function Docs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Navbar />
      <main style={{ padding: '4rem', color: '#fff', textAlign: 'center' }}>
        <h1>API Documentation</h1>
        <p>Swagger UI or Redoc can be embedded here and styled to match the theme.</p>
        <iframe src="/docs" style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '20px', background: '#fff' }} />
      </main>
    </div>
  );
}
