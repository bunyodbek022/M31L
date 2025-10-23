import Order_item from "../model/order_itemsModel.js";
export const getOrder_items = async (req, res, next) => {
  try {
    const order_item = await Order_item.find();
    res.send({ message: order_item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getOneOrder_item = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order_item = await Order_item.find({ id });
    res.send({ message: order_item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addOrder_item = async (req, res, next) => {
  try {
    const order_item = await Order_item.create(req.body);
    res.send({ message: order_item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updateOrder_item = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const order_item = await Order_item.updateOne({ id }, updatedData);
    if (!order_item) {
      return res.status(404).send("Order_item is not found!");
    }
    res.send({ message: order_item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const deleteOrder_item = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order_item = await Order_item.deleteOne(id);
    if (order_item.deletedCount === 0) {
      return res.status(404).json({ message: "Order_item is not found" });
    }
    res.send({ message: order_item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
