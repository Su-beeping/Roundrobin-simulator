const fs = require('fs');

const processTable = `import React from 'react';

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
}`;

const ganttChart = `import React from 'react';

export default function GanttChart({ timeline, colorMap }) {
  const totalTime = timeline[timeline.length - 1]?.end || 1;
  return (
    <section className="card">
      <h2 className="section-title">Gantt Chart</h2>
      <div className="gantt-wrap">
        <div className="gantt-bar">
          {timeline.map((block, i) => {
            const width = ((block.end - block.start) / totalTime) * 100;
            const isIdle = block.process === 'Idle';
            return (
              <div key={i} className="gantt-block"
                style={{ width: width + '%', background: isIdle ? '#2a2a3a' : colorMap[block.process] || '#6C63FF', opacity: isIdle ? 0.5 : 1 }}
                title={block.process + ': ' + block.start + ' to ' + block.end}>
                <span className="gantt-label">{block.process}</span>
              </div>
            );
          })}
        </div>
        <div className="gantt-timeline">
          {timeline.map((block, i) => (
            <div key={i} className="gantt-tick" style={{ width: ((block.end - block.start) / totalTime) * 100 + '%' }}>
              <span className="tick-label">{block.start}</span>
            </div>
          ))}
          <span className="tick-label tick-end">{totalTime}</span>
        </div>
      </div>
    </section>
  );
}`;

const resultsTable = `import React from 'react';

const COLORS = ['#6C63FF','#FF6584','#43C6AC','#F7971E','#a78bfa','#34d399','#fb923c','#60a5fa'];

export default function ResultsTable({ results, avgWaiting, avgTurnaround, colorMap }) {
  return (
    <section className="card">
      <h2 className="section-title">Process Statistics</h2>
      <div className="table-wrap">
        <table className="result-table">
          <thead>
            <tr><th></th><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround</th><th>Waiting</th></tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.id}>
                <td><span className="dot" style={{ background: colorMap[r.name] || COLORS[i % COLORS.length] }} /></td>
                <td className="proc-name">{r.name}</td>
                <td>{r.arrivalTime}</td>
                <td>{r.burstTime}</td>
                <td>{r.completionTime}</td>
                <td>{r.turnaroundTime}</td>
                <td className="waiting">{r.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="averages">
        <div className="avg-box"><span className="avg-label">Avg Waiting Time</span><span className="avg-value">{avgWaiting.toFixed(2)}</span></div>
        <div className="avg-box"><span className="avg-label">Avg Turnaround Time</span><span className="avg-value">{avgTurnaround.toFixed(2)}</span></div>
      </div>
    </section>
  );
}`;

const config = `const API_BASE_URL = 'http://localhost:5000/api';\nexport default API_BASE_URL;`;

fs.writeFileSync('./src/components/ProcessTable.js', processTable, { encoding: 'utf8' });
fs.writeFileSync('./src/components/GanttChart.js', ganttChart, { encoding: 'utf8' });
fs.writeFileSync('./src/components/ResultsTable.js', resultsTable, { encoding: 'utf8' });
fs.writeFileSync('./src/config.js', config, { encoding: 'utf8' });
console.log('All files written cleanly!');