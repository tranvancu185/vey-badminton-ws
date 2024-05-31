import express, { Router } from 'express';

// import routers
import userRouter from "@/packages/users/routes"
import authRouter from '@/packages/auth/routes';

// Create a new router instance
const router: Router = express.Router();

//use routers
router.use('/users', userRouter); // <- Users router
router.use('/auth', authRouter); // <- auth router


// Export the router 
export default router;