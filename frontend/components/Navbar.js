export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
      <a href="/" style={{ color: '#fff', fontWeight: 600 }}>Home</a>
      <a href="/dashboard" style={{ color: '#fff', fontWeight: 600 }}>Dashboard</a>
      <a href="/docs" style={{ color: '#fff', fontWeight: 600 }}>API Docs</a>
    </nav>
  );
}
