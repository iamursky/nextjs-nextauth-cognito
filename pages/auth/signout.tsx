import type { NextPage } from "next";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOutPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push(`http://localhost:3000`);
    });
  }, []);

  return null;
};

export default SignOutPage;
