import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Auto Deploy Works?</h1>
    </div>
  );
}
