import Navbar from '../components/Navbar';

export default function Docs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb, #fbc2eb, #fad0c4, #ffd6e0, #f6d365)', backgroundSize: '1200% 1200%', animation: 'gradientMove 18s ease infinite' }}>
      <Navbar />
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)', border: '2px solid #fbc2eb', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff6f91', marginBottom: '32px', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 12px #fad0c4' }}>
          📚 Documentation 🎨
        </h1>
        <p style={{ color: '#764ba2', fontWeight: 600, fontSize: '1.2rem', marginBottom: '24px' }}>
          Swagger UI or Redoc will appear here, styled to match the theme.<br/>
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#ff6f91' }}>
            (Embed your API docs directly, not as a nested page)
          </span>
        </p>

        <section style={{ margin: '32px 0', padding: '24px', background: 'rgba(252, 182, 159, 0.15)', borderRadius: '16px', boxShadow: '0 2px 12px #fad0c4', border: '2px solid #ffd6e0' }}>
          <h2 style={{ color: '#ff6f91', fontWeight: 700, fontSize: '1.5rem', marginBottom: '18px' }}>📜 Project History</h2>
          <ul style={{ textAlign: 'left', color: '#764ba2', fontSize: '1.1rem', lineHeight: '1.7' }}>
            <li><strong>2025-08:</strong> Initial release of Healthcare MCP Server with FHIR and EDI integrations.</li>
            <li><strong>2025-08:</strong> Added HIPAA-compliant security and OAuth2.0 authentication.</li>
            <li><strong>2025-09:</strong> Integrated NeonDB for scalable cloud data storage.</li>
            <li><strong>2025-09:</strong> Frontend dashboard and API playground launched with joyful UI.</li>
            <li><strong>2025-09:</strong> Documentation page improved with project history and theme matching.</li>
          </ul>
        </section>

        <section style={{ margin: '32px 0', padding: '24px', background: 'rgba(161, 196, 253, 0.15)', borderRadius: '16px', boxShadow: '0 2px 12px #a1c4fd', border: '2px solid #fbc2eb' }}>
          <h2 style={{ color: '#764ba2', fontWeight: 700, fontSize: '1.5rem', marginBottom: '18px' }}>📝 About This API</h2>
          <p style={{ color: '#764ba2', fontSize: '1.1rem', lineHeight: '1.7' }}>
            The Healthcare AI Assistant MCP Server provides secure, scalable access to patient data, appointment scheduling, drug interaction checking, insurance verification, and care coordination. It supports FHIR and EDI standards, integrates with NeonDB, and is protected by OAuth2.0 and HIPAA-compliant security.
          </p>
        </section>
      </main>
    </div>
  );
}
