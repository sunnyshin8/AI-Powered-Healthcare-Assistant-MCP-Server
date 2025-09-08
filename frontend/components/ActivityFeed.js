import { useState } from 'react';

export default function ActivityFeed() {
  const [activities, setActivities] = useState([
    { type: 'success', message: 'Server started successfully', time: 'Just now' },
    { type: 'info', message: 'MCP configuration loaded', time: '2 minutes ago' },
    { type: 'success', message: 'Database connection established', time: '5 minutes ago' },
  ]);

  return (
    <section style={{ margin: '2rem auto', maxWidth: '700px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', color: '#fff' }}>
      <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {activities.map((act, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: act.type === 'success' ? 'rgba(0,255,136,0.2)' : 'rgba(0,153,255,0.2)', color: act.type === 'success' ? '#00ff88' : '#0099ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{act.type === 'success' ? '✓' : 'i'}</span>
            <div>
              <div>{act.message}</div>
              <div style={{ opacity: 0.6, fontSize: '0.8rem' }}>{act.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
