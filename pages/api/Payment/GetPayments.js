import Orders from "@/model/Orders";


export default async function GetPayemnts(req, res) {

  const { enums } = req.body;
  try {
    const payments = await Orders.find().skip(enums * 5).limit(5).sort({created_at: -1});
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json(error);
  }
}
