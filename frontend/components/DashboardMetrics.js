export default function DashboardMetrics({ metrics }) {
  return (
    <section style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Total Patients</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.total_patients || '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Appointments Today</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.appointments_today || '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>Active Sessions</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.active_sessions || '...'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff', minWidth: '180px', textAlign: 'center' }}>
        <h2>System Uptime</h2>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.system_uptime || '...'}</div>
      </div>
    </section>
  );
}
