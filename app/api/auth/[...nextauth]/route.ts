import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@lib/mongodb"; // Your Mongoose connection helper
import UserModel, { IUser } from "@models/User"; // Your Mongoose User model and IUser interface
// bcrypt should be available in your UserModel via the comparePassword method

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // `credentials` is used to generate a form on the sign-in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "jsmith@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    console.log("Missing credentials in authorize");
                    return null;
                }

                await dbConnect();

                try {
                    const user: IUser | null = await UserModel.findOne({
                        email: credentials.email,
                    }).select("+password");

                    if (!user) {
                        console.log(
                            "No user found for email:",
                            credentials.email
                        );
                        return null;
                    }

                    const isPasswordCorrect = await user.comparePassword(
                        credentials.password
                    );

                    if (!isPasswordCorrect) {
                        console.log(
                            "Password incorrect for user:",
                            credentials.email
                        );
                        return null;
                    }

                    console.log("User authorized:", user.email);

                    // Assert user to a known structure before returning
                    const finalUser = user as {
                        _id: { toString: () => string };
                        name: string;
                        email: string;
                        // IUser also has comparePassword, but we don't return that method itself
                    };

                    return {
                        id: finalUser._id.toString(),
                        name: finalUser.name,
                        email: finalUser.email,
                    };
                } catch (error) {
                    console.error("Error in authorize function:", error);
                    return null;
                }
            },
        }),
        // ...add more providers here, e.g., GoogleProvider, GitHubProvider
    ],
    session: {
        strategy: "jwt", // Using JWT for session strategy is common
    },
    // pages: { // Optional: Custom pages for sign-in, sign-out, error, etc.
    //     signIn: '/login', // If your login page is at /login
    //     // error: '/auth/error', // Error code passed in query string as ?error=
    // },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the user id and other relevant info to the token
            if (user) {
                // user object is available on sign-in
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from the token.
            if (session.user) {
                // Check if session.user exists
                (session.user as any).id = token.id as string; // Ensure id is string
            }
            return session;
        },
    },
    // secret: process.env.NEXTAUTH_SECRET, // Already handled by NextAuth if NEXTAUTH_SECRET is set
    // debug: process.env.NODE_ENV === 'development', // Optional: for more logs
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
