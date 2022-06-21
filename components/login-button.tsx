import { FC, Fragment } from "react";

import { CognitoAuth } from "amazon-cognito-auth-js";
import { useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

export const LoginButton: FC = () => {
  const { data } = useSession();

  const handleClickSignIn = useCallback(() => {
    signIn("cognito");
  }, []);

  const handleClickSignOut = useCallback(() => {
    const cognitoAuth = new CognitoAuth({
      AppWebDomain: `${process.env.NEXT_PUBLIC_COGNITO_APP_WEB_DOMAIN}`,
      ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
      RedirectUriSignIn: "http://localhost:3000/",
      RedirectUriSignOut: "http://localhost:3000/auth/signout",
      TokenScopesArray: ["email"],
    });

    cognitoAuth.signOut();
  }, []);

  if (!data) {
    return (
      <Fragment>
        <button onClick={handleClickSignIn}>Sign in</button>
        {process.env.NODE_ENV !== "production" ? (
          <button onClick={handleClickSignOut}>Sign out</button>
        ) : null}
      </Fragment>
    );
  }

  return <button onClick={handleClickSignOut}>Sign out</button>;
};
