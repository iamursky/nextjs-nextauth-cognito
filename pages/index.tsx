import type { NextPage } from "next";

import { Fragment } from "react";
import { LoginButton } from "../components/login-button";
import { AccessToken } from "../components/access-token";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Cognito + NextAuth.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton />
        <AccessToken />
      </main>
    </Fragment>
  );
};

export default Home;
