const crypto = require("crypto");

const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let text = req.body.order_id + "|" + req.body.razorpay_payment_id;
      let secret = process.env.RAZORPAY_KEY_SECRET;
      let algorithm = "sha256";
      let hash, hmac;
      hmac = crypto.createHmac(algorithm, secret);
      hmac.update(text);
      hash = hmac.digest("hex");
      if (hash == req.body.razorpay_signature) {
        // instance.payments.capture(
        //   req.body.razorpay_payment_id,
        //   req.body.amount,
        //   req.body.currency
        // );
        return res
          .status(200)
          .json({ message: "Course has been successfully registered." });
      }
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  }
}
