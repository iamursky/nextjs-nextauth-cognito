import type { NextPage } from "next";

import { CognitoAuth } from "amazon-cognito-auth-js";
import { Fragment, useCallback, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  const { data } = useSession();

  const [redirecting, setRedirecting] = useState<boolean>(false);

  const handleClickSignIn = useCallback(() => {
    setRedirecting(true);
    signIn("cognito");
  }, []);

  const handleClickSignOut = useCallback(() => {
    setRedirecting(true);

    signOut().then(() => {
      const cognitoAuth = new CognitoAuth({
        AppWebDomain: `${process.env.NEXT_PUBLIC_COGNITO_APP_WEB_DOMAIN}`,
        ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
        RedirectUriSignIn: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
        RedirectUriSignOut: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
        TokenScopesArray: ["email"],
      });

      cognitoAuth.signOut();
    });
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Cognito + NextAuth.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data ? (
        <button onClick={handleClickSignOut} disabled={redirecting}>
          Sign out
        </button>
      ) : (
        <button onClick={handleClickSignIn} disabled={redirecting}>
          Sign in
        </button>
      )}

      <pre>
        <code>{data ? JSON.stringify(data, null, 2) : ""}</code>
      </pre>
    </Fragment>
  );
};

export default Home;
