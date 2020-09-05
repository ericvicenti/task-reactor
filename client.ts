import { useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

let client: null | LiveClient = null;

function setupGlobalWSClient(): void {
  if (client) {
    return;
  }
  const subscribers = new Set<(data: any) => void>();
  const wsClient = new ReconnectingWebSocket("ws://localhost:3000", [], {
    // debug: true,
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    minUptime: 5000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4000,
    maxRetries: Infinity,
  });

  wsClient.onopen = () => {
    console.log("DID CONNECT!");
  };

  wsClient.onmessage = (msg: MessageEvent) => {
    subscribers.forEach((f) => f(JSON.parse(msg.data)));
  };

  client = {
    send: (data: any) => wsClient.send(JSON.stringify(data)),
    subscribe: (handler: (data: any) => void) => {
      subscribers.add(handler);
      return () => {
        subscribers.delete(handler);
      };
    },
  };
}

interface LiveClient {
  subscribe: (handler: (data: any) => void) => () => void;
  send: (data: string | Buffer) => void;
}

export function useClient(
  callback: (client: LiveClient) => void,
  deps: React.DependencyList
) {
  useEffect(() => {
    setupGlobalWSClient();
    if (!client) {
      throw new Error("client setup failed");
    }
    callback(client);
  }, deps);
}
