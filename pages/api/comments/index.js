import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const comments = await Comment.find();
    response.status(200).json(comments);
    return;
  }

  response.status(405).json({ status: "method not allowed" });
}
