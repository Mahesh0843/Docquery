import React, { useRef, useState, useEffect } from "react";
import Message from "./Message";

export default function ChatPane({ messages, onSend, onClear }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const submit = (e) => { e.preventDefault(); onSend(input); setInput(""); };

  return (
    <div className="chat-pane">
      <div className="chat-header">
        <h3>Chat</h3>
        <button className="link" onClick={onClear}>Clear</button>
      </div>

      <div className="chat-messages">
        {messages.map(m => <Message key={m.id} m={m} />)}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input" onSubmit={submit}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about your documents..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
