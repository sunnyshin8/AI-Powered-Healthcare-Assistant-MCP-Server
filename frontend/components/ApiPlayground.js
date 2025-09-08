import { useState } from 'react';

const endpoints = [
  { label: 'Health Check', path: '/healthz', method: 'GET' },
  { label: 'Patient Data', path: '/patient/12345', method: 'GET' },
  { label: 'OpenAPI Spec', path: '/openapi.json', method: 'GET' },
];

export default function ApiPlayground() {
  const [response, setResponse] = useState('Click a button above to test an endpoint...');
  const [loading, setLoading] = useState(false);

  async function testEndpoint(endpoint) {
    setLoading(true);
    try {
      const res = await fetch(endpoint.path, { method: endpoint.method });
      const data = await res.text();
      setResponse(`Status: ${res.status} ${res.statusText}\nResponse:\n${data}`);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
    setLoading(false);
  }

  return (
    <section style={{ margin: '2rem auto', maxWidth: '700px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff' }}>
      <h2 style={{ marginBottom: '1rem' }}>API Playground</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {endpoints.map(ep => (
          <button key={ep.label} style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }} onClick={() => testEndpoint(ep)}>
            {ep.label}
          </button>
        ))}
      </div>
      <pre style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem', minHeight: '100px', color: '#fff', fontFamily: 'monospace', opacity: loading ? 0.5 : 1 }}>{loading ? 'Loading...' : response}</pre>
    </section>
  );
}
