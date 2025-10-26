import { Customer } from '../model/customersModel.js';
import { config } from '../config/index.js';
import { verifyToken, generateToken } from '../helper/jwt.js';

export const authController = {
  signup: async (req, res, next) => {
    try {
      const customer = req.validated;

      const customerExist = await customer.find({ email: customer.email });
      if (customerExist.length !== 0) {
        res.status(403).send({
          message: `# ${Customer.email} already exist`,
        });
        return;
      }
      const newcustomer = await Customer.create(customer);
      res.send(newcustomer);
    } catch (error) {
      next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      const customer = req.validated;

      const customerData = await Customer.findOne({ email: customer.email });

      if (customerData.length === 0) {
        res.status(404).send({
          message: `# ${customer.email} not found`,
        });
        return;
      }

      const isValidPassword = await customerData.compasePassword(
        customer.password,
      );

      if (!isValidPassword) {
        res.status(400).send({
          message: 'customer email or password is not valid',
        });
        return;
      }

      const accessPayload = {
        id: customerData._id,
        email: customerData.email,
      };
      const accessToken = await generateToken(
        accessPayload,
        config.jwt.accessSecret,
        '1h',
      );

      const refreshPaylod = {
        id: customerData._id,
        name: customerData.name,
      };
      const refreshToken = await generateToken(
        refreshPaylod,
        config.jwt.refreshSecret,
        '30d',
      );

      res.status(200).send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
  profile: (req, res, next) => {
    try {
      const customer = req.customer;
      res.send(customer);
    } catch (error) {
      next(error);
    }
  },
  updateAccess: async (req, res, next) => {
    try {
      const data = req.body;
      const refreshToken = data.refreshToken;

      const verifed = await verifyToken(refreshToken, config.jwt.refreshSecret);
      const customer = await customer.findById(verifed.id);
      const payload = {
        id: customer._id,
        email: customer.email,
        name: customer.name,
      };
      const accessToken = generateToken(payload, config.jwt.accessSecret, '1h');
      res.status(200).send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
