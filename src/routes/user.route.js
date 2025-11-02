import { Router } from 'express';
import { getUsers, updateUser } from '../controller/user.controller.js';
import { authGuard } from '../middleware/guard.middleware.js';
import { validate } from '../validation/validation.js';
import {
  customerUpdate,
  adminUpdateUserValidate,
} from '../validation/user.validation.js';

const router = Router();

router.get('/', getUsers);

router.put(
  '/:id',
  authGuard,
  (req, res, next) => {
    if (req.user.role === 'admin') {
      return validate(adminUpdateUserValidate)(req, res, next);
    } else {
      return validate(customerUpdate)(req, res, next);
    }
  },
  updateUser,
);

export { router as userRouter };
