export default function Custom404() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(270deg, #ff6f61, #379683, #b2f7ef, #ffb6b9, #fae3d9)',
      color: '#ff6f61',
      fontWeight: 'bold',
      fontSize: '2.5rem',
      letterSpacing: '2px'
    }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', color: '#379683' }}>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{ marginTop: '24px', color: '#b2f7ef', fontWeight: 'bold', textDecoration: 'underline' }}>Go Home</a>
    </div>
  );
}
