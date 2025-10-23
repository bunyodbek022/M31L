import Customer from "../model/customersModel.js";
export const getCustomers = async (req, res, next) => {
  try {
    const customer = await Customer.find();
    res.send(customer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.find({ id });
    res.send({ message: customer });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.send({ message: customer });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const customer = await Customer.updateOne({ id }, updatedData);
    if (!customer) {
      return res.status(404).send("customer is not found!");
    }
    res.send({ message: customer });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.deleteOne(id);
    if (customer.deletedCount === 0) {
      return res.status(404).json({ message: "customer is not found" });
    }
    res.send({ message: customer });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
