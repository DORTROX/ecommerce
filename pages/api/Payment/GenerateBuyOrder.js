import { RazorpayInstance } from "@/lib/RazorPay";
import shortid from "shortid";

export default async function GenerateOrders(req, res) {
  if (req.method != "POST") return;

  const {amount} = req.body;

  const option = {
    amount: amount * 100,
    currency: 'INR',
    receipt: shortid.generate()
  }

  try {
    const response = await RazorpayInstance.orders.create(option)
    res.status(200).json({
      id: response.id,
      amount: amount,
      currency: 'INR'
    })

  } catch (err) {
    res.status(400).json(err)
    console.log(err)
  }
}