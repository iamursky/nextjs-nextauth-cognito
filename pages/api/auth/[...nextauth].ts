import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
  secret: `${process.env.SECRET}`,
  providers: [
    CognitoProvider({
      idToken: true,
      clientId: `${process.env.COGNITO_CLIENT_ID}`,
      clientSecret: `${process.env.COGNITO_CLIENT_SECRET}`,
      issuer: `${process.env.COGNITO_ISSUER}`,
    }),
  ],
  callbacks: {
    // Persist the OAuth access_token to the token right after signin
    async jwt({ token, account, profile }) {
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
      session.accessToken = token.accessToken;
      session.profile = token.profile;
      delete session.user;

      return session;
    },
  },
});
