import Address from "../model/addressModel.js";
export const getAddress = async (req, res, next) => {
  try {
    const address = await Address.find();
    res.send(address);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getOneAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.find({ id });
    res.send({ message: address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await Address.create(req.body);
    res.send({ message: address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const address = await Address.updateOne({ id }, updatedData);
    if (!address) {
      return res.status(404).send("Address is not found!");
    }
    res.send({ message: address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.deleteOne(id);
    if (address.deletedCount === 0) {
      return res.status(404).json({ message: "Address is not found" });
    }
    res.send({ message: address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
