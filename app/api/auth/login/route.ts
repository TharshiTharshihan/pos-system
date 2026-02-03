import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongo";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../libs/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectMongo();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = signToken({ id: user._id });

    const res = NextResponse.json({ message: "Login success" });

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
