import jwt from 'jsonwebtoken';

// CREATE TOKEN
export const generateToken = (payload, secret, expiresIn) => {
  try {
    console.log({
      payload,
      secret,
      expiresIn,
    });

    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

// CHECK TOKEN
export const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};
