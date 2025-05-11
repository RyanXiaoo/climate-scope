import { NextResponse } from "next/server";
// We no longer need bcrypt here directly as Mongoose model handles hashing
// import bcrypt from "bcryptjs"; // For password hashing
import dbConnect from "@lib/mongodb"; // Mongoose connection helper
import UserModel from "@models/User"; // Mongoose User model

// Placeholder: Replace this with your actual database connection and user model
// Example for Prisma (you'd need to set up Prisma and your schema):
// import prisma from '@/lib/prisma';

// Remove the in-memory store
// const users: any[] = [];

export async function POST(request: Request) {
    try {
        await dbConnect(); // Ensure Mongoose connection is established

        const { name, email, password } = await request.json();

        // --- Input Validation (Mongoose schema will also validate) ---
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields (name, email, password)." },
                { status: 400 }
            );
        }
        // Password length validation is now handled by Mongoose schema minlength

        // --- Check if user already exists (using Mongoose model) ---
        // Note: Mongoose `unique: true` on email in schema will throw an error on save if violated.
        // So, this check is a pre-emptive measure for a friendlier error message.
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists." },
                { status: 409 } // 409 Conflict
            );
        }

        // --- Create User (using Mongoose model) ---
        // Password will be hashed by the pre-save middleware in UserSchema
        const newUser = await UserModel.create({
            name,
            email,
            password, // Pass the plain password; Mongoose middleware will hash it
        });

        // --- Return Success Response ---
        // newUser object will contain the created user (excluding password due to `select: false`)
        return NextResponse.json(
            {
                message: "User registered successfully!",
                userId: newUser._id, // Mongoose uses _id
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);

        // Handle Mongoose Validation Errors for more specific feedback
        if (error.name === "ValidationError") {
            let errors: Record<string, string> = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return NextResponse.json(
                { message: "Validation failed", errors },
                { status: 400 }
            );
        }

        // Handle Mongoose Duplicate Key Error (e.g., email already exists)
        // Code 11000 is for duplicate key
        if (
            error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.email
        ) {
            return NextResponse.json(
                { message: "User with this email already exists." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "An unexpected error occurred during registration." },
            { status: 500 }
        );
    }
}
