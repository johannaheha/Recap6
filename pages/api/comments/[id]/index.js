import Comment from "@/db/models/Comment";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const foundComments = await Comment.find({ placeId: id });
    return response.status(200).json(foundComments);
  }

  if (request.method === "DELETE") {
    const deleted = await Comment.findByIdAndDelete(id);
    response.status(200).json({ status: "Comment successfully deleted" });
  }

  response.status(405).json({ status: "Method not allowed." });
}
