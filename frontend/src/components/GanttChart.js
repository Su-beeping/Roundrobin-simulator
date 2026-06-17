import React from 'react';

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
}