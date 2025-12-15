import React from "react";

export default function HistoryPane({ messages, setMessages }) {
  const pairs = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === 'user') {
      const user = messages[i];
      const assistant = messages.slice(i+1).find(m => m.role === 'assistant');
      pairs.push({ id: user.id, q: user.text, a: assistant?.text || '' });
    }
  }

  const loadPair = (pair) => {
    const now = Date.now();
    setMessages(prev => [...prev, { id: now+"-u", role: 'user', text: pair.q }, { id: now+"-b", role:'assistant', text: pair.a }]);
  };

  return (
    <div className="history">
      <h3>History</h3>
      {pairs.length === 0 ? <div className="muted">No history yet.</div> : (
        <ul>
          {pairs.slice().reverse().map(p => (
            <li key={p.id} className="history-item" onClick={() => loadPair(p)}>
              <div className="q">Q: {truncate(p.q)}</div>
              <div className="a muted">A: {truncate(p.a)}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="hint muted">Click an item to re-open in chat</div>
    </div>
  );
}

function truncate(s, n=120){ if(!s) return ''; return s.length>n? s.slice(0,n-1)+"…":s }
