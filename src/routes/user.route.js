import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';
import {
  authGuard,
  roleGuard,
  selfGuard,
} from '../middleware/guard.middleware.js';
import { validate } from '../validation/validation.js';
import {
  customerUpdate,
  adminUpdateUserValidate,
  customerValidate,
} from '../validation/user.validation.js';

const router = Router();

//  GET all users (faqat authGuard talab qilinmasa ham qo'yilgan)
router.get('/', authGuard, UserController.getAll);

router.get('/:id', authGuard, selfGuard, UserController.getOne);

router.post(
  '/',
  authGuard,
  roleGuard('admin'),
  validate(customerValidate, 'body'),
  UserController.add,
);

//  UPDATE user
router.put(
  '/:id',
  authGuard,
  (req, res, next) => {
    const schema =
      req.user.role === 'admin' ? adminUpdateUserValidate : customerUpdate;
    return validate(schema, 'body')(req, res, next);
  },
  UserController.update,
);

export { router as userRouter };
