export default function ErrorPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', color: '#fff' }}>
      <h1>404 - Page Not Found</h1>
      <p>The endpoint you're looking for is not available.</p>
      <a href="/" style={{ color: '#00ff88' }}>Go Home</a>
    </div>
  );
}
