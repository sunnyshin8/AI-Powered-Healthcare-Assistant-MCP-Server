import styles from '../styles/theme.module.css';
import { useEffect, useState } from 'react';
import DashboardMetrics from '../components/DashboardMetrics';
import ApiPlayground from '../components/ApiPlayground';
import ActivityFeed from '../components/ActivityFeed';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // TODO: Replace with actual OAuth2.0 access token retrieval logic
        const accessToken = 'YOUR_OAUTH2_ACCESS_TOKEN';
        const res = await fetch('https://ztaip-yuuhba1h-4xp4r634bq-uc.a.run.app/mcp', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setMetrics(await res.json());
      } catch (err) {
        console.error('Failed to fetch MCP metrics:', err);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.dashboardContainer} style={{ minHeight: '100vh', background: 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb, #fbc2eb, #fad0c4, #ffd6e0, #f6d365)', backgroundSize: '1200% 1200%', animation: 'gradientMove 18s ease infinite' }}>
      <Navbar />
      <main className={styles.dashboardMain} style={{ maxWidth: '1100px', margin: '40px auto', padding: '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)', transition: 'box-shadow 0.3s', border: '2px solid #fbc2eb' }}>
        <h1 className={styles.dashboardTitle} style={{ fontSize: '3rem', fontWeight: 800, color: '#ff6f91', marginBottom: '32px', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 12px #fad0c4' }}>
          🎉 Healthcare Assistant Dashboard 🎈
        </h1>
        <section style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '40px', background: 'linear-gradient(90deg, #fbc2eb 0%, #a1c4fd 100%)', borderRadius: '16px', padding: '22px', boxShadow: '0 2px 12px #fbc2eb', border: '2px solid #ffd6e0', animation: 'pulse 2s infinite alternate' }}>
          <DashboardMetrics metrics={metrics} />
        </section>
        <section style={{ background: 'linear-gradient(90deg, #fad0c4 0%, #ffd6e0 100%)', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px #fad0c4', marginBottom: '40px', border: '2px solid #f6d365', animation: 'pulse 2s infinite alternate' }}>
          <h2 style={{ fontSize: '1.7rem', color: '#ff6f91', marginBottom: '18px', fontWeight: 700 }}>✨ Recent Activity</h2>
          <ActivityFeed />
        </section>
        <section style={{ background: 'linear-gradient(90deg, #fcb69f 0%, #c2e9fb 100%)', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px #fcb69f', border: '2px solid #a1c4fd', animation: 'pulse 2s infinite alternate' }}>
          <h2 style={{ fontSize: '1.7rem', color: '#ff6f91', marginBottom: '18px', fontWeight: 700 }}>🧩 API Playground</h2>
          <ApiPlayground />
        </section>
      </main>
    </div>
  );
}

// Add animated gradient background keyframes
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `@keyframes gradientMove {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
  }
  @keyframes pulse {
    0% { box-shadow: 0 2px 12px #fbc2eb; }
    100% { box-shadow: 0 8px 32px #fad0c4; }
  }`;
  document.head.appendChild(style);
}
