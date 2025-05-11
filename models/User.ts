import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for User document (for TypeScript typing)
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    // Add any other fields you anticipate here, e.g.:
    // emailVerified?: boolean;
    // resetPasswordToken?: string;
    // resetPasswordExpires?: Date;
    // apiData?: Record<string, any>; // For storing data from different APIs

    // Mongoose methods (optional, if you add instance methods to your schema)
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Mongoose Schema Definition
const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: true, // Ensures email addresses are unique in the collection
        lowercase: true, // Converts email to lowercase before saving
        trim: true,
        match: [
            // Basic email validation regex
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: false, // By default, password field will not be returned in queries
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // emailVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    // apiData: {
    //     type: Schema.Types.Mixed, // Or define a more specific schema if known
    //     default: {},
    // },
});

// Pre-save middleware to hash password before saving
// Important: Must use a regular function here, not an arrow function, to preserve `this` context
UserSchema.pre<IUser>("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error); // Pass error to the next middleware/error handler
    }
});

// Instance method to compare candidate password with the hashed password
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
// Mongoose will create a collection named 'users' (lowercase, pluralized version of 'User')
// The third argument to mongoose.model is optional and specifies the collection name explicitly if needed.
// Check if the model already exists to prevent OverwriteModelError in Next.js dev mode
const UserModel: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
