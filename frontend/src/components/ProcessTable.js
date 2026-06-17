import React from 'react';

const COLORS = ['#6C63FF','#FF6584','#43C6AC','#F7971E','#a78bfa','#34d399','#fb923c','#60a5fa'];

export default function ProcessTable({ processes, quantum, onUpdate, onRemove, onAdd, onQuantumChange, onSimulate, onReset, loading, error }) {
  return (
    <section className="card input-card">
      <div className="card-header">
        <h2>Processes</h2>
        <div className="quantum-row">
          <label>Time Quantum (Q)</label>
          <input type="number" min="1" value={quantum} onChange={e => onQuantumChange(e.target.value)} className="quantum-input" />
        </div>
      </div>
      <div className="table-wrap">
        <table className="process-table">
          <thead>
            <tr><th></th><th>Name</th><th>Arrival Time</th><th>Burst Time</th><th></th></tr>
          </thead>
          <tbody>
            {processes.map((p, i) => (
              <tr key={p.id}>
                <td><span className="dot" style={{ background: COLORS[i % COLORS.length] }} /></td>
                <td><input className="cell-input" value={p.name} onChange={e => onUpdate(p.id, 'name', e.target.value)} /></td>
                <td><input className="cell-input" type="number" min="0" value={p.arrivalTime} onChange={e => onUpdate(p.id, 'arrivalTime', e.target.value)} /></td>
                <td><input className="cell-input" type="number" min="1" value={p.burstTime} onChange={e => onUpdate(p.id, 'burstTime', e.target.value)} /></td>
                <td><button className="remove-btn" onClick={() => onRemove(p.id)}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-row">
        <button className="btn-secondary" onClick={onAdd}>+ Add Process</button>
        <button className="btn-secondary" onClick={onReset}>Reset</button>
        <button className="btn-primary" onClick={onSimulate} disabled={loading}>{loading ? 'Simulating...' : '▶  Run Simulation'}</button>
      </div>
      {error && <div className="error-box">{error}</div>}
    </section>
  );
}