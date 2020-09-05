import { useState, useRef } from "react";
import { useClient } from "../../client";

export default function () {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const sendDataRef = useRef<(data: string | Buffer) => void>();
  useClient(({ send }) => {
    sendDataRef.current = send;
  }, []);
  return (
    <div>
      <p>Your Secret Key:</p>
      <input
        type="text"
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <p>New banner:</p>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendDataRef.current({ key, message });
        }}
      >
        Set Live Message
      </button>
    </div>
  );
}
