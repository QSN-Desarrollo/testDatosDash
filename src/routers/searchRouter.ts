import { Router } from 'express';
import controllers from '../controllers/filtradoControllers';
import { validarNetwork } from '../middleware/token';
// import { verifyToken, authorizeUserRole, authorizeAdminRole } from '../middleware/index';

const router = Router();

// router.get('/data', controllers.getData);
// router.get('/filter/:network',validarNetwork, controllers.getFilteredData);
router.get('/filter', controllers.getFilteredData);
router.get('/filterOneTweet', controllers.getOneTweet);
router.get('/allByCliente/:clientId',controllers.getAllTweetsOneClient)
// router.post('/create', controllers.post  );
export default router;