import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongodb";
import topicModel from "../../../../models/topic";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await connectMongo();
    const topic = await topicModel.findById(id);

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } =await params;
    const { title, description } = await req.json();
    await connectMongo();
    const updatedTopic = await topicModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Topic updated!!", updatedTopic },
      { status: 200 }
    );
  } catch (error) {

    console.error(error);
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;  

    await connectMongo();

    const deleted = await topicModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
