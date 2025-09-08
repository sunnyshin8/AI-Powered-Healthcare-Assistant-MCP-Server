import Navbar from '../components/Navbar';
import styles from '../styles/theme.module.css';

export default function Home() {
  return (
    <div className={styles.gradientBg}>
      <Navbar />
      <main className={styles.heroSection}>
        <div className={styles.animatedHero}>
          <h1 className={styles.title}>Healthcare AI Assistant MCP Server</h1>
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
