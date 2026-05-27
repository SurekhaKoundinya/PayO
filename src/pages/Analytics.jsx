import { useState, useEffect } from 'react';
import { SkeletonCards } from '../components/Skeleton';

const allData = {
  '7days':  { approved:210, rejected:18, pending:55,  monthly:[
    {month:'Mon',approved:28,rejected:3,pending:8},{month:'Tue',approved:35,rejected:2,pending:10},
    {month:'Wed',approved:42,rejected:4,pending:9},{month:'Thu',approved:30,rejected:2,pending:7},
    {month:'Fri',approved:38,rejected:3,pending:11},{month:'Sat',approved:22,rejected:2,pending:6},{month:'Sun',approved:15,rejected:2,pending:4},
  ], avgTime:'2.8 mins', successRate:'92.1%', rejRate:'3.1%', daily:'~49' },
  '30days': { approved:820, rejected:62, pending:180, monthly:[
    {month:'W1',approved:180,rejected:14,pending:42},{month:'W2',approved:210,rejected:16,pending:50},
    {month:'W3',approved:195,rejected:15,pending:44},{month:'W4',approved:235,rejected:17,pending:44},
  ], avgTime:'3.0 mins', successRate:'92.3%', rejRate:'3.3%', daily:'~47' },
  '3months':{ approved:2800, rejected:195, pending:520, monthly:[
    {month:'Mar',approved:810,rejected:55,pending:110},{month:'Apr',approved:950,rejected:70,pending:130},{month:'May',approved:1020,rejected:80,pending:245},
  ], avgTime:'3.1 mins', successRate:'92.2%', rejRate:'3.2%', daily:'~48' },
  'custom': { approved:1020, rejected:80, pending:245, monthly:[
    {month:'Jan',approved:620,rejected:45,pending:80},{month:'Feb',approved:740,rejected:60,pending:95},
    {month:'Mar',approved:810,rejected:55,pending:110},{month:'Apr',approved:950,rejected:70,pending:130},{month:'May',approved:1020,rejected:80,pending:245},
  ], avgTime:'3.2 mins', successRate:'92.4%', rejRate:'3.4%', daily:'~49' },
};

const H = 160;

export default function Analytics() {
  const [range, setRange]     = useState('30days');
  const [loading, setLoading] = useState(true);
  const [custom, setCustom]   = useState({ from:'2026-05-01', to:'2026-05-27' });
  const [showCustom, setShowCustom] = useState(false);

  const data = allData[range] || allData['30days'];
  const MAX  = Math.max(...data.monthly.map(d => d.approved + d.pending + d.rejected));

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [range]);

  const docs = [
    {type:'Aadhaar',  count:5800, pct:53, c:'#2563EB'},
    {type:'PAN Card', count:3200, pct:29, c:'#8B5CF6'},
    {type:'Passport', count:2050, pct:18, c:'#06B6D4'},
  ];

  const reasons = [
    {r:'Documents unclear / blurry',   n:42, p:53},
    {r:'Aadhaar & PAN mismatch',       n:28, p:35},
    {r:'Selfie does not match ID',     n:15, p:19},
    {r:'Expired document',             n:8,  p:10},
    {r:'Cropped / partial document',   n:7,  p:9},
  ];

  const kpis = [
    {label:'Avg Processing Time', value:data.avgTime,    change:'↓ 0.8 min vs prev',  up:true,  e:'⏱️', bg:'#EFF6FF'},
    {label:'Success Rate',        value:data.successRate,change:'↑ 1.2% vs prev',      up:true,  e:'✅', bg:'#F0FDF4'},
    {label:'Rejection Rate',      value:data.rejRate,    change:'↓ 0.5% vs prev',      up:true,  e:'❌', bg:'#FEF2F2'},
    {label:'Daily Submissions',   value:data.daily,      change:'↑ 8.3% this week',    up:true,  e:'📋', bg:'#FFF7ED'},
  ];

  const dist = [
    {label:'Approved',  value:data.approved, total:data.approved+data.rejected+data.pending, c:'#10B981', bg:'#F0FDF4'},
    {label:'Pending',   value:data.pending,  total:data.approved+data.rejected+data.pending, c:'#F59E0B', bg:'#FFFBEB'},
    {label:'Failed',    value:data.rejected, total:data.approved+data.rejected+data.pending, c:'#EF4444', bg:'#FEF2F2'},
  ];

  const ranges = [
    {v:'7days',   l:'Last 7 Days'},
    {v:'30days',  l:'Last 30 Days'},
    {v:'3months', l:'Last 3 Months'},
    {v:'custom',  l:'Custom Range'},
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Analytics</h2><p>KYC performance metrics and trends.</p></div>

        {/* Date Range Picker */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
          <div className="date-range-bar">
            {ranges.map(r => (
              <button key={r.v}
                className={`date-range-btn${range===r.v?' active':''}`}
                onClick={() => { setRange(r.v); if(r.v==='custom') setShowCustom(true); else setShowCustom(false); }}>
                {r.l}
              </button>
            ))}
          </div>

          {/* Custom date inputs */}
          {range === 'custom' && (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--stat-card-bg,#fff)', border:'1.5px solid var(--gray-200)', borderRadius:10, padding:'7px 12px', animation:'pageIn 0.2s ease' }}>
              <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <input type="date" value={custom.from} onChange={e=>setCustom(p=>({...p,from:e.target.value}))}
                style={{ border:'none', background:'none', fontSize:13, color:'var(--gray-800)', outline:'none', fontFamily:"'Inter',sans-serif" }}/>
              <span style={{ color:'var(--gray-400)', fontSize:12 }}>→</span>
              <input type="date" value={custom.to} onChange={e=>setCustom(p=>({...p,to:e.target.value}))}
                style={{ border:'none', background:'none', fontSize:13, color:'var(--gray-800)', outline:'none', fontFamily:"'Inter',sans-serif" }}/>
              <button onClick={()=>setLoading(true)||setTimeout(()=>setLoading(false),500)}
                style={{ background:'var(--blue)', color:'#fff', border:'none', borderRadius:7, padding:'5px 12px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Range indicator */}
      <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--blue)' }}/>
        <span style={{ fontSize:12.5, color:'var(--gray-400)', fontWeight:500 }}>
          Showing data for: <strong style={{ color:'var(--navy)' }}>
            {range==='custom' ? `${custom.from} → ${custom.to}` : ranges.find(r=>r.v===range)?.l}
          </strong>
        </span>
      </div>

      {/* KPI Cards */}
      {loading ? <SkeletonCards count={4}/> : (
        <div className="stats-row" style={{ marginBottom:22 }}>
          {kpis.map(k => (
            <div className="stat-card" key={k.label} style={{ transition:'all 0.3s' }}>
              <div className="stat-top">
                <div>
                  <div className="stat-label">{k.label}</div>
                  <div className="stat-value" style={{ fontSize:20 }}>{k.value}</div>
                  <div className="stat-change up" style={{ fontSize:11 }}>{k.change}</div>
                </div>
                <div className="stat-icon" style={{ background:k.bg, fontSize:21 }}>{k.e}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          {[1,2,3,4].map(i=><div key={i} className="skeleton sk-card" style={{height:260}}/>)}
        </div>
      ) : (
        <div className="analytics-grid">
          {/* Bar chart */}
          <div className="chart-card">
            <h3>KYC Submissions — {ranges.find(r=>r.v===range)?.l}</h3>
            <div className="bar-wrap">
              {data.monthly.map(d => {
                const tot = d.approved + d.pending + d.rejected;
                const ah  = Math.round((d.approved / MAX) * H);
                const ph  = Math.round((d.pending  / MAX) * H);
                const rh  = Math.round((d.rejected / MAX) * H);
                return (
                  <div className="bar-group" key={d.month}>
                    <div className="bar-stack">
                      <div className="bar-seg" style={{ height:ah, background:'#10B981' }} title={`Approved: ${d.approved}`}/>
                      <div className="bar-seg" style={{ height:ph, background:'#F59E0B' }} title={`Pending: ${d.pending}`}/>
                      <div className="bar-seg" style={{ height:rh, background:'#EF4444' }} title={`Rejected: ${d.rejected}`}/>
                    </div>
                    <div className="bar-label">{d.month}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display:'flex', gap:14, marginTop:12, justifyContent:'center' }}>
              {[['#10B981','Approved'],['#F59E0B','Pending'],['#EF4444','Rejected']].map(([c,l])=>(
                <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--gray-600)' }}>
                  <div style={{ width:10, height:10, borderRadius:3, background:c }}></div>{l}
                </div>
              ))}
            </div>
          </div>

          {/* Document breakdown */}
          <div className="chart-card">
            <h3>Document Type Breakdown</h3>
            {docs.map(d => (
              <div className="prog-row" key={d.type}>
                <div className="prog-top">
                  <span className="prog-name">{d.type}</span>
                  <span className="prog-val" style={{ color:d.c }}>{d.pct}% ({d.count.toLocaleString()})</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{ width:`${d.pct}%`, background:d.c }}/></div>
              </div>
            ))}
            <div style={{ background:'var(--gray-100)', borderRadius:10, padding:'12px 14px', marginTop:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--gray-400)', marginBottom:5 }}>INSIGHT</div>
              <div style={{ fontSize:13, color:'var(--gray-600)', lineHeight:1.5 }}>Aadhaar leads at 53%. Streamlining Aadhaar flow can reduce avg processing time.</div>
            </div>
          </div>

          {/* Status distribution */}
          <div className="chart-card">
            <h3>Status Distribution</h3>
            <div className="mini-grid">
              {dist.map(s => (
                <div key={s.label} className="mini-stat" style={{ background:s.bg }}>
                  <div className="mini-val" style={{ color:s.c }}>{s.value.toLocaleString()}</div>
                  <div className="mini-lab">{s.label}</div>
                  <div className="mini-pct">{Math.round((s.value/(s.total||1))*100)}% of total</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection reasons */}
          <div className="chart-card">
            <h3>Top Rejection Reasons</h3>
            {reasons.map(r => (
              <div className="prog-row" key={r.r}>
                <div className="prog-top">
                  <span className="prog-name" style={{ fontSize:12 }}>{r.r}</span>
                  <span className="prog-val" style={{ color:'var(--red)', fontSize:13 }}>{r.n}</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{ width:`${r.p}%`, background:'#EF4444' }}/></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
