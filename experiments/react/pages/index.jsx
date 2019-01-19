import Link from "next/link";
import Head from "next/head";

export default () => (
  <div>
    <Head>
      <title>Math Project - Experiments with React, Mathbox and Next.js</title>
    </Head>
    <h3>List of experiments with Mathbox, React and Next.js</h3>
    <ul>
      <li>
        <Link href="/sin">
          <a>Sin function</a>
        </Link>{" "}
        - dynamic visualization with interactive settings panel
      </li>
    </ul>
  </div>
);
