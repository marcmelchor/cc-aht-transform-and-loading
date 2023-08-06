import { Router } from 'express';

import { transformAndLoad } from '../controllers/transform-and-load.controller';
import { isAllowed } from '../utils/middlewares';

const router: Router = Router();

router.get('/transform-and-load', isAllowed, transformAndLoad);

export default router;
