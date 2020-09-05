import { useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useClient } from "../client";
import Head from "next/head";

export default function WSTest() {
  const [message, setMessage] = React.useState();
  useClient((client) => {
    client.subscribe((data) => {
      setMessage(data.message);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Our LIVE page</title>
      </Head>
      {message && (
        <div>
          <h2>{message}</h2>
        </div>
      )}
      <p>Normal site content</p>
    </>
  );
}
