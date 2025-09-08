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
      const res = await fetch('/api/status');
      setMetrics(await res.json());
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
  <div className={styles.dashboardContainer} style={{ minHeight: '100vh', background: 'linear-gradient(270deg, #ffb6b9, #fae3d9, #bbded6, #8ac6d1, #b2f7ef)', backgroundSize: '1200% 1200%', animation: 'gradientMove 18s ease infinite' }}>
      <Navbar />
  <main className={styles.dashboardMain} style={{ maxWidth: '1100px', margin: '40px auto', padding: '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.98)', boxShadow: '0 8px 32px rgba(60, 60, 120, 0.18)', transition: 'box-shadow 0.3s' }}>
  <h1 className={styles.dashboardTitle} style={{ fontSize: '2.7rem', fontWeight: 700, color: '#ff6f61', marginBottom: '32px', textAlign: 'center', letterSpacing: '1px', textShadow: '0 2px 8px #fae3d9' }}>
          Healthcare Assistant Dashboard
        </h1>
        <section style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '40px', background: 'rgba(255,182,185,0.15)', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px rgba(255,182,185,0.12)', transition: 'box-shadow 0.3s' }}>
          <DashboardMetrics metrics={metrics} />
        </section>
        <section style={{ background: 'rgba(186,222,214,0.7)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(186,222,214,0.12)', marginBottom: '40px', transition: 'box-shadow 0.3s' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#379683', marginBottom: '18px', fontWeight: 600 }}>Recent Activity</h2>
          <ActivityFeed />
        </section>
        <section style={{ background: 'rgba(250,227,217,0.7)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(250,227,217,0.12)', transition: 'box-shadow 0.3s' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#ffb6b9', marginBottom: '18px', fontWeight: 600 }}>API Playground</h2>
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
  }`;
  document.head.appendChild(style);
}
