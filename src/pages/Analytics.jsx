import { monthlyData } from '../data/mockData';

const MAX = Math.max(...monthlyData.map(d => d.approved + d.pending + d.rejected));
const H = 160;

export default function Analytics(){
  const kpis=[
    {label:'Avg Processing Time',value:'3.2 mins',change:'↓ 0.8 min vs last month',up:true,e:'⏱️',bg:'#EFF6FF'},
    {label:'Success Rate',value:'92.4%',change:'↑ 1.2% vs last month',up:true,e:'✅',bg:'#F0FDF4'},
    {label:'Rejection Rate',value:'3.4%',change:'↓ 0.5% vs last month',up:true,e:'❌',bg:'#FEF2F2'},
    {label:'Daily Submissions',value:'~49',change:'↑ 8.3% this week',up:true,e:'📋',bg:'#FFF7ED'},
  ];
  const docs=[
    {type:'Aadhaar',count:5800,pct:53,c:'#2563EB'},
    {type:'PAN Card',count:3200,pct:29,c:'#8B5CF6'},
    {type:'Passport',count:2050,pct:18,c:'#06B6D4'},
  ];
  const dist=[
    {label:'Approved',value:1020,total:1425,c:'#10B981',bg:'#F0FDF4'},
    {label:'Pending', value:245, total:1425,c:'#F59E0B',bg:'#FFFBEB'},
    {label:'In Review',value:80, total:1425,c:'#2563EB',bg:'#EFF6FF'},
    {label:'Failed',  value:80, total:1425,c:'#EF4444',bg:'#FEF2F2'},
  ];
  const reasons=[
    {r:'Documents unclear / blurry',n:42,p:53},
    {r:'Aadhaar & PAN mismatch',    n:28,p:35},
    {r:'Selfie does not match ID',  n:15,p:19},
    {r:'Expired document',          n:8, p:10},
    {r:'Cropped / partial document',n:7, p:9},
  ];

  return(
    <div className="page">
      <div className="page-header"><div className="page-header-left"><h2>Analytics</h2><p>KYC performance metrics and trends.</p></div></div>

      <div className="stats-row" style={{marginBottom:22}}>
        {kpis.map(k=>(
          <div className="stat-card" key={k.label}>
            <div className="stat-top">
              <div><div className="stat-label">{k.label}</div><div className="stat-value" style={{fontSize:20}}>{k.value}</div><div className="stat-change up" style={{fontSize:11}}>{k.change}</div></div>
              <div className="stat-icon" style={{background:k.bg,fontSize:21}}>{k.e}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        {/* Bar chart */}
        <div className="chart-card">
          <h3>Monthly KYC Submissions</h3>
          <div className="bar-wrap">
            {monthlyData.map(d=>{
              const tot=d.approved+d.pending+d.rejected;
              const ah=Math.round((d.approved/MAX)*H);
              const ph=Math.round((d.pending/MAX)*H);
              const rh=Math.round((d.rejected/MAX)*H);
              return(
                <div className="bar-group" key={d.month}>
                  <div className="bar-stack">
                    <div className="bar-seg" style={{height:ah,background:'#10B981'}} title={`Approved: ${d.approved}`}/>
                    <div className="bar-seg" style={{height:ph,background:'#F59E0B'}} title={`Pending: ${d.pending}`}/>
                    <div className="bar-seg" style={{height:rh,background:'#EF4444'}} title={`Rejected: ${d.rejected}`}/>
                  </div>
                  <div className="bar-label">{d.month}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:'flex',gap:14,marginTop:12,justifyContent:'center'}}>
            {[['#10B981','Approved'],['#F59E0B','Pending'],['#EF4444','Rejected']].map(([c,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'var(--gray-600)'}}>
                <div style={{width:10,height:10,borderRadius:3,background:c}}></div>{l}
              </div>
            ))}
          </div>
        </div>

        {/* Doc breakdown */}
        <div className="chart-card">
          <h3>Document Type Breakdown</h3>
          {docs.map(d=>(
            <div className="prog-row" key={d.type}>
              <div className="prog-top">
                <span className="prog-name">{d.type}</span>
                <span className="prog-val" style={{color:d.c}}>{d.pct}% ({d.count.toLocaleString()})</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{width:`${d.pct}%`,background:d.c}}/></div>
            </div>
          ))}
          <div style={{background:'var(--gray-100)',borderRadius:10,padding:'12px 14px',marginTop:16}}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--gray-400)',marginBottom:5}}>INSIGHT</div>
            <div style={{fontSize:13,color:'var(--gray-600)',lineHeight:1.5}}>Aadhaar leads at 53%. Streamlining the Aadhaar flow can reduce processing time significantly.</div>
          </div>
        </div>

        {/* Status distribution */}
        <div className="chart-card">
          <h3>KYC Status Distribution — May 2026</h3>
          <div className="mini-grid">
            {dist.map(s=>(
              <div className="mini-stat" key={s.label} style={{background:s.bg}}>
                <div className="mini-val" style={{color:s.c}}>{s.value}</div>
                <div className="mini-lab">{s.label}</div>
                <div className="mini-pct">{Math.round((s.value/s.total)*100)}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rejection reasons */}
        <div className="chart-card">
          <h3>Top Rejection Reasons</h3>
          {reasons.map(r=>(
            <div className="prog-row" key={r.r}>
              <div className="prog-top">
                <span className="prog-name" style={{fontSize:12}}>{r.r}</span>
                <span className="prog-val" style={{color:'var(--red)',fontSize:13}}>{r.n}</span>
              </div>
              <div className="prog-bar"><div className="prog-fill" style={{width:`${r.p}%`,background:'#EF4444'}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
