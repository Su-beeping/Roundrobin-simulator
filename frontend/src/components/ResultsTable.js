import React from 'react';

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
}