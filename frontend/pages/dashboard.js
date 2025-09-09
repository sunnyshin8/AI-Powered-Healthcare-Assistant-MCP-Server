import styles from '../styles/theme.module.css';
import { useEffect, useState } from 'react';
import DashboardMetrics from '../components/DashboardMetrics';
import ApiPlayground from '../components/ApiPlayground';
import ActivityFeed from '../components/ActivityFeed';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/sample_patients.json');
        const data = await res.json();
        setPatients(data);
        setMetrics({
          total_patients: data.length,
          appointments_today: data.filter(p => p.appointments.some(a => a.date === new Date().toISOString().slice(0, 10))).length,
          active_sessions: Math.floor(Math.random() * 10) + 1,
          system_uptime: `${Math.floor(Math.random() * 100)} hrs`
        });
      } catch (err) {
        console.error('Failed to fetch sample patient data:', err);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientIdChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const handleFetchPatient = () => {
    if (!selectedPatientId) {
      setSelectedPatient(null);
      return;
    }
  const id = selectedPatientId.trim().toLowerCase();
  // Filter out empty objects and only search valid patients
  const validPatients = patients.filter(p => p && typeof p === 'object' && p.patient_id && typeof p.patient_id === 'string');
  let patient = validPatients.find(p => p.patient_id && p.patient_id.trim().toLowerCase() === id);
  setSelectedPatient(patient || null);
  };
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
        <section style={{ marginBottom: '32px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px #fbc2eb', border: '1px solid #ffd6e0' }}>
          <label htmlFor="patientId" style={{ fontWeight: 600, color: '#ff6f91', marginRight: '12px' }}>Fetch Patient by ID:</label>
          <input
            id="patientId"
            type="text"
            value={selectedPatientId}
            onChange={handlePatientIdChange}
            onKeyDown={e => {
              if (e.key === 'Enter') handleFetchPatient();
            }}
          />
          <button onClick={handleFetchPatient} style={{ padding: '8px 18px', borderRadius: '8px', background: 'linear-gradient(90deg, #fbc2eb 0%, #a1c4fd 100%)', color: '#ff6f91', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Enter</button>
          {selectedPatientId && (
            selectedPatient && selectedPatient.name ? (
              <div style={{ marginTop: '18px', textAlign: 'left', background: 'rgba(252,182,159,0.1)', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px #fad0c4', border: '1px solid #ffd6e0' }}>
                <h3 style={{ color: '#ff6f91', fontWeight: 700 }}>Patient Details</h3>
                <div><strong>Name:</strong> {selectedPatient.name}</div>
                <div><strong>DOB:</strong> {selectedPatient.dob}</div>
                <div><strong>Gender:</strong> {selectedPatient.gender}</div>
                <div><strong>Address:</strong> {selectedPatient.address}</div>
                <div><strong>Email:</strong> {selectedPatient.email}</div>
                <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                <div><strong>Appointments:</strong>
                  {Array.isArray(selectedPatient.appointments) && selectedPatient.appointments.length > 0 ? (
                    <ul style={{ paddingLeft: '18px' }}>
                      {selectedPatient.appointments.map(a => (
                        <li key={a.appointment_id || a.id} style={{ marginBottom: '8px' }}>
                          <div><strong>ID:</strong> {a.appointment_id || a.id}</div>
                          <div><strong>Date:</strong> {a.appointment_date || a.date}</div>
                          {a.appointment_time && <div><strong>Time:</strong> {a.appointment_time}</div>}
                          {a.appointment_type && <div><strong>Type:</strong> {a.appointment_type}</div>}
                          <div><strong>Provider:</strong> {a.provider}</div>
                          <div><strong>Status:</strong> {a.status}</div>
                          <div><strong>Reason:</strong> {a.reason}</div>
                          {a.notes && <div><strong>Notes:</strong> {a.notes}</div>}
                          <button style={{ marginTop: '4px', padding: '4px 12px', borderRadius: '6px', background: 'linear-gradient(90deg, #a1c4fd 0%, #fbc2eb 100%)', color: '#ff6f91', fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={() => alert(`Reschedule requested for appointment ${a.appointment_id || a.id}`)}>Reschedule</button>
                        </li>
                      ))}
                    </ul>
                  ) : 'None'}
                </div>
                <div><strong>Insurance:</strong> {selectedPatient.insurance && selectedPatient.insurance.provider ? `${selectedPatient.insurance.provider} (${selectedPatient.insurance.policy_number || 'N/A'})` : 'N/A'}</div>
              </div>
            ) : (
              <div style={{ color: '#ff6f91', fontWeight: 600, marginTop: '18px' }}>No patient found for ID: {selectedPatientId}</div>
            )
          )}
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
