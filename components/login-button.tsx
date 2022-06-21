import { FC, useState } from "react";

import { CognitoAuth } from "amazon-cognito-auth-js";
import { useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton: FC = () => {
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
        RedirectUriSignIn: "http://localhost:3000",
        RedirectUriSignOut: "http://localhost:3000",
        TokenScopesArray: ["email"],
      });

      cognitoAuth.signOut();
    });
  }, []);

  return (
    <div>
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
    </div>
  );
};
