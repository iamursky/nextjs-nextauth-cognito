import type { FC } from "react";

import { useSession } from "next-auth/react";

export const AccessToken: FC = () => {
  const { data, status } = useSession();

  return (
    <section>
      <h2>{status}:</h2>
      <pre>
        <code>{data ? JSON.stringify(data, null, 2) : ""}</code>
      </pre>
    </section>
  );
};
