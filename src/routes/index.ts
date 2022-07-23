import {Router} from "express"
import userRoute from './usersRoute';
import transactionRoute from "./transactionRoute";

const router: Router = Router();

transactionRoute(router);
userRoute(router);

export default router;