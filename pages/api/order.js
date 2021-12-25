// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default function handler(req, res) {
  try {
    // const { price } = req.params;
    // console.log(price);
    const price = 3150;
    const country = "India";
    const amount =
      country === "India" ? price * 100 : Math.round(price / 70) * 100;
    const options = {
      amount: amount, // amount == Rs 10
      currency: country === "India" ? "INR" : "USD",
      receipt: "",
    };
    instance.orders.create(options, (err, order) => {
      console.log(err);
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
}
