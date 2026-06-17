function roundRobin(processes, quantum) {
  const n = processes.length;
  const remaining = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  let time = 0;
  let completed = 0;
  const timeline = [];
  const results = processes.map(p => ({ id: p.id, name: p.name, arrivalTime: p.arrivalTime, burstTime: p.burstTime, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }));
  const queue = [];
  const inQueue = new Array(n).fill(false);
  remaining.forEach((p, i) => { if (p.arrivalTime <= time) { queue.push(i); inQueue[i] = true; } });
  while (completed < n) {
    if (queue.length === 0) {
      const nextArrival = remaining.filter((p, i) => !inQueue[i] && p.remainingTime > 0).reduce((min, p) => p.arrivalTime < min ? p.arrivalTime : min, Infinity);
      if (nextArrival === Infinity) break;
      timeline.push({ process: 'Idle', start: time, end: nextArrival });
      time = nextArrival;
      remaining.forEach((p, i) => { if (!inQueue[i] && p.arrivalTime <= time && p.remainingTime > 0) { queue.push(i); inQueue[i] = true; } });
      continue;
    }
    const idx = queue.shift();
    const execTime = Math.min(quantum, remaining[idx].remainingTime);
    const start = time;
    time += execTime;
    remaining[idx].remainingTime -= execTime;
    timeline.push({ process: remaining[idx].name, pid: remaining[idx].id, start, end: time });
    remaining.forEach((p, i) => { if (!inQueue[i] && p.arrivalTime <= time && p.remainingTime > 0) { queue.push(i); inQueue[i] = true; } });
    if (remaining[idx].remainingTime === 0) {
      completed++;
      results[idx].completionTime = time;
      results[idx].turnaroundTime = time - processes[idx].arrivalTime;
      results[idx].waitingTime = results[idx].turnaroundTime - processes[idx].burstTime;
    } else { queue.push(idx); }
  }
  const avgWaiting = results.reduce((s, r) => s + r.waitingTime, 0) / n;
  const avgTurnaround = results.reduce((s, r) => s + r.turnaroundTime, 0) / n;
  return { timeline, results, avgWaiting, avgTurnaround };
}
module.exports = { roundRobin };