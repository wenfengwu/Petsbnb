import  express  from 'express';
import { create, viewAll, image, hostHotels, remove, read } from '../controllers/hotelController';
import formidable from 'express-formidable';
import { requireSignIn, hotelOwner } from '../middlewares';


const router = express.Router();

router.post("/newHotel", requireSignIn, formidable(), create);
router.get("/hotels", viewAll);
router.get("/hotel/image/:hotelId", image);
router.get("/host-hotels", requireSignIn, hostHotels);
router.delete('/delete/:hotelId', requireSignIn, hotelOwner, remove);
router.get('/hotel/:hotelId', read);

module.exports = router;