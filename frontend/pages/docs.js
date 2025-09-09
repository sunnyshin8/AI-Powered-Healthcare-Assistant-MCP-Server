import Navbar from '../components/Navbar';

export default function Docs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb, #fbc2eb, #fad0c4, #ffd6e0, #f6d365)', backgroundSize: '1200% 1200%', animation: 'gradientMove 18s ease infinite' }}>
      <Navbar />
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)', border: '2px solid #fbc2eb', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff6f91', marginBottom: '32px', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 12px #fad0c4' }}>
          📚 Documentation 🎨
        </h1>
        <p style={{ color: '#764ba2', fontWeight: 600, fontSize: '1.2rem', marginBottom: '24px' }}>Swagger UI or Redoc can be embedded here and styled to match the theme.</p>
        <iframe src="/docs" style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '20px', background: '#fff', boxShadow: '0 2px 12px #fbc2eb' }} />
      </main>
    </div>
  );
}
