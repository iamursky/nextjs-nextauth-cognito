import CognitoProvider from "next-auth/providers/cognito";
import NextAuth from "next-auth";

export default NextAuth({
  debug: process.env.NODE_ENV !== "production",
  secret: `${process.env.SECRET}`,
  providers: [
    CognitoProvider({
      idToken: true,
      clientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
      clientSecret: `${process.env.COGNITO_CLIENT_SECRET}`,
      issuer: `${process.env.COGNITO_ISSUER}`,
    }),
  ],
  callbacks: {
    // Persist the OAuth access_token to the token right after signin
    async jwt({ token, account, profile, isNewUser, user }) {
      console.group("jwt");
      console.log("token:", token);
      console.log("account:", account);
      console.log("profile:", profile);
      console.log("isNewUser:", isNewUser);
      console.log("user:", user);
      console.groupEnd();

      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.profile = profile;
      }

      return token;
    },

    // Send properties to the client, like an access_token from a provider.
    async session({ session, token, user }) {
      console.group("session");
      console.log("session:", session);
      console.log("token:", token);
      console.log("user:", user);
      console.groupEnd();

      session.accessToken = token.accessToken;
      session.profile = token.profile;
      delete session.user;

      return session;
    },

    async signIn({ account, email, profile, user, credentials }) {
      console.group("signIn");
      console.log("account:", account);
      console.log("email:", email);
      console.log("profile:", profile);
      console.log("user:", user);
      console.log("credentials:", credentials);
      console.groupEnd();

      return true;
    },

    async redirect({ baseUrl, url }) {
      console.group("redirect");
      console.log("baseUrl:", baseUrl);
      console.log("url:", url);
      console.groupEnd();

      return url;
    },
  },
});
