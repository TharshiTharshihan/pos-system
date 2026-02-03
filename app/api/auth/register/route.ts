import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongo";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {name, email, password } = body;


    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email and password are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+.]{6,9}$/;

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: "Password must contain between 6 and 9 characters long uppercase, number, and special characters" },
        { status: 400 }
      );
    }


    await connectMongo();

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name,email, password: hashed });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}