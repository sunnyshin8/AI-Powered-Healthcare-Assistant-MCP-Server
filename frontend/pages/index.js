import Navbar from '../components/Navbar';
import styles from '../styles/theme.module.css';

export default function Home() {
  return (
      <div className={styles.homeContainer} style={{ minHeight: '100vh', background: 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb, #fbc2eb, #fad0c4, #ffd6e0, #f6d365)', backgroundSize: '1200% 1200%', animation: 'gradientMove 18s ease infinite' }}>
      <Navbar />
        <main className={styles.homeMain} style={{ maxWidth: '900px', margin: '40px auto', padding: '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)', border: '2px solid #fbc2eb' }}>
        <div className={styles.animatedHero}>
            <h1 className={styles.homeTitle} style={{ fontSize: '2.7rem', fontWeight: 800, color: '#ff6f91', marginBottom: '32px', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 12px #fad0c4' }}>
              👋 Welcome to Healthcare Assistant 🎉
            </h1>
          <p className={styles.subtitle}>
            Secure, dynamic, and visually stunning healthcare workflow automation.
          </p>
          <div className={styles.buttonGroup}>
            <a href="/dashboard" className={styles.btn}>Live Dashboard</a>
            <a href="/docs" className={styles.btnAlt}>API Docs</a>
          </div>
        </div>
      </main>
    </div>
  );
}
