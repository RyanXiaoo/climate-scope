import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering (recommended)
            // useNewUrlParser: true, // Deprecated but often in older examples
            // useUnifiedTopology: true, // Deprecated
        };

        const dbNameFromEnv = process.env.MONGODB_DB_NAME;
        const originalUrl = new URL(MONGODB_URI!);
        let finalUriToConnect = MONGODB_URI!;

        if (dbNameFromEnv) {
            // If MONGODB_DB_NAME is set, prioritize it.
            // Construct a new URL object to safely modify the pathname.
            const newUrl = new URL(MONGODB_URI!);
            newUrl.pathname = `/${dbNameFromEnv}`;
            finalUriToConnect = newUrl.toString();
        } else if (originalUrl.pathname && originalUrl.pathname !== "/") {
            // If no MONGODB_DB_NAME, but DB name is in original URI path, use that.
            finalUriToConnect = MONGODB_URI!;
        } else {
            // No DB name in env, no DB name in URI path. Mongoose will likely use 'test' or error.
            console.warn(
                `[dbConnect] WARNING: MongoDB database name not found in MONGODB_DB_NAME or URI path. Mongoose may default to 'test' DB. URI: ${MONGODB_URI}`
            );
            // finalUriToConnect remains the original MONGODB_URI which might connect to default 'test' db
        }

        cached!.promise = mongoose
            .connect(finalUriToConnect, opts)
            .then((mongooseInstance) => {
                return mongooseInstance;
            });
    }
    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null; // Reset promise on error
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;
