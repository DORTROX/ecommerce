import Orders from "@/model/Orders";

export default async function GetPayemnts(req, res) {
  const { id, status } = req.body;
  try {
    const order = await Orders.findOneAndUpdate({ orderId: id }, { $set: { Delivered: status } });
    if (!order) {
      return res.status(400).send("No order found");
    }
    res.status(200).send("Completed");
  } catch (error) {
    res.status(400).json(error);
  }
}
