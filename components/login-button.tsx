import type { FC } from "react";

import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton: FC = () => {
  const { data } = useSession();

  if (!data) {
    return <button onClick={() => signIn("cognito")}>Sign in</button>;
  }

  return <button onClick={() => signOut()}>Sign out</button>;
};
