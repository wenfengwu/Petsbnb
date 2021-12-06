import  express  from 'express';
import { connectAccount } from '../controllers/stripeController';
import { requireSignIn } from '../middlewares';


const router = express.Router();

router.post("/connectAccount", requireSignIn, connectAccount)

module.exports = router;