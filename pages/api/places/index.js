import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    response.status(200).json(places);
    return;
  }

  if (request.method === "POST") {
    const placeData = request.body;
    await Place.create(placeData);

    response.status(201).json({ status: "Place created." });
    return;
  }

  response.status(405).json({ status: "method not allowed" });
}
