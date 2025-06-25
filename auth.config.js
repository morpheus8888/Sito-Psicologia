import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const client = await pool.connect();
        try {
          const { rows } = await client.query(
            "SELECT id, email, password, name FROM users WHERE email=$1",
            [credentials.email]
          );
          if (rows.length === 0) return null;
          const user = rows[0];
          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;
          return { id: user.id, email: user.email, name: user.name };
        } finally {
          client.release();
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
