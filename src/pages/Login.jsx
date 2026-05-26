import { useState } from 'react';

const CREDENTIALS = { email: 'admin@payo.com', password: 'Admin@123' };

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
        onLogin({ name: 'Admin User', role: 'Super Admin', email });
      } else {
        setLoading(false);
        setError('Invalid email or password. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 900);
  };

  const fillDemo = () => {
    setEmail(CREDENTIALS.email);
    setPassword(CREDENTIALS.password);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #0D1B3E 50%, #0A0A0A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow blobs */}
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'#8B5CF6', opacity:0.06, filter:'blur(80px)', top:-100, left:-100, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'#06B6D4', opacity:0.06, filter:'blur(80px)', bottom:-100, right:-100, pointerEvents:'none' }}/>

      <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>

        {/* ── Logo: your real PNG app icon ── */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:32 }}>
          <img
            src={process.env.PUBLIC_URL + "/images/payo-icon-logo.png"}
            alt="PayO"
            style={{
              width: 130,
              height: 130,
              objectFit: 'contain',
              borderRadius: 28,
              display: 'block',
            }}
          />
        </div>

        {/* Login card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          padding: '36px 36px 32px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          animation: shake ? 'shake 0.5s ease' : 'none',
        }}>
          <style>{`
            @keyframes shake {
              0%,100%{transform:translateX(0)}
              20%{transform:translateX(-8px)}
              40%{transform:translateX(8px)}
              60%{transform:translateX(-5px)}
              80%{transform:translateX(5px)}
            }
            @keyframes spin { to { transform: rotate(360deg); } }
            .li {
              width:100%; padding:12px 14px;
              background:rgba(255,255,255,0.06);
              border:1.5px solid rgba(255,255,255,0.1);
              border-radius:10px; font-size:14px;
              color:#fff; outline:none;
              font-family:'Inter',sans-serif;
              transition:border-color 0.2s, background 0.2s;
            }
            .li::placeholder { color:rgba(255,255,255,0.28); }
            .li:focus { border-color:#3B82F6; background:rgba(255,255,255,0.09); }
            .li.err { border-color:#EF4444; }
          `}</style>

          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:5, letterSpacing:'-0.3px' }}>
            Welcome back
          </h2>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:28 }}>
            Sign in to your admin account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:7 }}>
                Email
              </label>
              <input
                className={`li${error ? ' err' : ''}`}
                type="email"
                placeholder="admin@payo.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:7 }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <input
                  className={`li${error ? ' err' : ''}`}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  required
                  style={{ paddingRight:44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', fontSize:16, padding:0, display:'flex', alignItems:'center' }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background:'rgba(239,68,68,0.14)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:9, padding:'10px 13px', marginBottom:18, fontSize:13, color:'#FCA5A5', display:'flex', alignItems:'center', gap:8 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width:'100%', padding:'13px',
                background: loading ? 'rgba(37,99,235,0.4)' : 'linear-gradient(135deg, #2563EB, #3B82F6)',
                border:'none', borderRadius:10, color:'#fff',
                fontSize:14, fontWeight:600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily:"'Inter',sans-serif",
                boxShadow:'0 4px 20px rgba(37,99,235,0.35)',
                transition:'all 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              }}>
              {loading
                ? <><span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite', display:'inline-block' }}/> Signing in...</>
                : 'Sign In →'
              }
            </button>
          </form>

          <div style={{ marginTop:20, textAlign:'center' }}>
            <button
              onClick={fillDemo}
              style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, color:'rgba(255,255,255,0.3)', fontFamily:"'Inter',sans-serif", textDecoration:'underline', textUnderlineOffset:3 }}>
              Use demo credentials
            </button>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div style={{ marginTop:18, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.28)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:5 }}>Demo Credentials</div>
            <div style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)' }}>📧 admin@payo.com</div>
            <div style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)', marginTop:2 }}>🔑 Admin@123</div>
          </div>
          <button
            onClick={fillDemo}
            style={{ background:'rgba(37,99,235,0.2)', border:'1px solid rgba(37,99,235,0.35)', borderRadius:8, padding:'7px 14px', color:'#93C5FD', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            Fill
          </button>
        </div>
      </div>
    </div>
  );
}
