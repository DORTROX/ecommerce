import { client } from "@/lib/client";
const { v4: uuidv4 } = require('uuid');

export default async function updateReview(req, res) {
  const { slug, id, review } = req.body;

  const newReview = {
    _type: "object",
    _key: uuidv4(),
    id: id,
    review: review,
  };

  client
    .fetch(`*[_type == "product" && _id == '${slug}'][0]`)
    .then((document) => {
      // Retrieve the existing reviews array from the document
      const existingReviews = document.reviews || [];

      // Append the new review to the existing reviews array
      const updatedReviews = [...existingReviews, newReview];

      // Update the document with the updated reviews array
      return client.patch(slug).set({ reviews: updatedReviews }).commit();
    })
    .then((res) => {
      console.log("Document Added");
      res.send(200)
    })
    .catch((err) => res.send(400));
}
