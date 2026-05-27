export function SkeletonTable({ rows = 6, cols = 5 }) {
  const widths = ['40%','60%','35%','25%','20%'];
  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Header */}
      <div style={{ display:'flex', gap:16, padding:'12px 20px', borderBottom:'1px solid var(--gray-200)', marginBottom:4 }}>
        {Array.from({length:cols},(_,i)=>(
          <div key={i} className="skeleton sk-text" style={{ width:widths[i]||'20%', height:11 }}/>
        ))}
      </div>
      {/* Rows */}
      {Array.from({length:rows},(_,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 20px', borderBottom:'1px solid var(--gray-100)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <div className="skeleton" style={{ width:38, height:38, borderRadius:10, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div className="skeleton sk-text wide" style={{ marginBottom:5 }}/>
              <div className="skeleton sk-text short"/>
            </div>
          </div>
          {Array.from({length:cols-1},(_,j)=>(
            <div key={j} className="skeleton sk-text" style={{ width:widths[j+1]||'20%' }}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 4 }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${count},1fr)`, gap:18, marginBottom:24 }}>
      {Array.from({length:count},(_,i)=>(
        <div key={i} className="skeleton sk-card" style={{ height:170 }}/>
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="page" style={{ animation:'none' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <div className="skeleton sk-text" style={{ width:160, height:22, marginBottom:8 }}/>
          <div className="skeleton sk-text" style={{ width:260, height:13 }}/>
        </div>
        <div className="skeleton" style={{ width:120, height:36, borderRadius:10 }}/>
      </div>
      <SkeletonCards count={4}/>
      <div className="card" style={{ overflow:'hidden' }}>
        <div style={{ padding:'18px 22px', borderBottom:'1px solid var(--gray-200)', display:'flex', justifyContent:'space-between' }}>
          <div className="skeleton sk-text" style={{ width:180, height:16 }}/>
          <div className="skeleton" style={{ width:80, height:30, borderRadius:8 }}/>
        </div>
        <SkeletonTable rows={6} cols={5}/>
      </div>
    </div>
  );
}
