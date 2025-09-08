export default function DashboardMetrics({ metrics }) {
  return (
    <section style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Uptime</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.uptime || '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Requests</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.requests_total || '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Response Time</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.response_time_ms ? metrics.response_time_ms + 'ms' : '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Security</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.security_score || '...'}</div>
      </div>
    </section>
  );
}
