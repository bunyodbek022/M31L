import Payment from "../model/paymentsModel.js";
export const getPayments = async (req, res, next) => {
  try {
    const payment = await Payment.find();
    res.send({ message: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getOnePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.find({ id });
    res.send({ message: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.send({ message: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const payment = await Payment.updateOne({ id }, updatedData);
    if (!payment) {
      return res.status(404).send("Payment is not found!");
    }
    res.send({ message: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.deleteOne(id);
    if (payment.deletedCount === 0) {
      return res.status(404).json({ message: "Payment is not found" });
    }
    res.send({ message: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
