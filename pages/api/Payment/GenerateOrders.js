export default async function GenerateOrders(req, res) {
    const { amount } = req.body;
    var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
}