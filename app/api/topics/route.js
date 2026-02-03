import { NextResponse } from "next/server";
import connectMongo from "../../../libs/mongodb";
import topicModel from "../../../models/topic";

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    await connectMongo();
    await topicModel.create({ title, description });
    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("====================================");
    console.log("Error is : ", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
    console.log("====================================");
  }
}

export const dynamic = "force-dynamic";


export async function GET(){
    await connectMongo()
    const topics = await topicModel.find()
    return NextResponse.json({topics})
}



