import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import API_BASE_URL from './config';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import ResultsTable from './components/ResultsTable';

const COLORS = ['#6C63FF','#FF6584','#43C6AC','#F7971E','#a78bfa','#34d399','#fb923c','#60a5fa'];

const defaultProcesses = [
  { id: 1, name: 'P1', arrivalTime: 0, burstTime: 5 },
  { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3 },
  { id: 3, name: 'P3', arrivalTime: 2, burstTime: 8 },
];

export default function App() {
  const [processes, setProcesses] = useState(defaultProcesses);
  const [quantum, setQuantum] = useState(2);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addProcess = () => {
    const id = processes.length + 1;
    setProcesses([...processes, { id, name: `P${id}`, arrivalTime: 0, burstTime: 1 }]);
  };

  const removeProcess = (id) => setProcesses(processes.filter(p => p.id !== id));

  const updateProcess = (id, field, value) => {
    setProcesses(processes.map(p =>
      p.id === id ? { ...p, [field]: field === 'name' ? value : Number(value) } : p
    ));
  };

  const simulate = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/simulate`, { processes, quantum: Number(quantum) });
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Cannot connect to backend. Make sure the server is running on port 5000.');
    }
    setLoading(false);
  };

  const reset = () => { setProcesses(defaultProcesses); setQuantum(2); setResult(null); setError(''); };

  const colorMap = {};
  processes.forEach((p, i) => { colorMap[p.name] = COLORS[i % COLORS.length]; });

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⟳</span>
            <span className="logo-text">RoundRobin<span className="logo-accent">.sim</span></span>
          </div>
          <p className="header-sub">CPU Scheduling Visualizer</p>
        </div>
      </header>

      <main className="main">
        <ProcessTable
          processes={processes}
          quantum={quantum}
          onUpdate={updateProcess}
          onRemove={removeProcess}
          onAdd={addProcess}
          onQuantumChange={setQuantum}
          onSimulate={simulate}
          onReset={reset}
          loading={loading}
          error={error}
        />

        {result && (
          <>
            <GanttChart timeline={result.timeline} colorMap={colorMap} />
            <ResultsTable
              results={result.results}
              avgWaiting={result.avgWaiting}
              avgTurnaround={result.avgTurnaround}
              colorMap={colorMap}
            />
          </>
        )}
      </main>
    </div>
  );
}