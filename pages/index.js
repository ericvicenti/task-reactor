import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>TaskReactor</h1>
      <h2>Not a todo list. Tasks.</h2>
    </div>
  );
}
