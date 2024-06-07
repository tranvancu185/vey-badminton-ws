import express, { Router } from 'express';

// import routers
import userRouter from "@/packages/users/routes"
import authRouter from '@/packages/auth/routes';
import customerRouter from './customers/routes';
import authenticateToken from '@/middlewares/auth-middleware';

// Create a new router instance
const router: Router = express.Router();

//auth routers
router.use('/auth', authRouter); // <- auth router
//use routers
customerRouter.use(authenticateToken);
router.use('/users', userRouter); // <- Users router
router.use('/customers', customerRouter)// <- customer router

// Export the router 
export default router;