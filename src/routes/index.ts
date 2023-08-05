import { Router } from 'express';

import { transformAndLoad } from '../controllers/transform-and-load.controller';

const router: Router = Router();

router.get('/transform-and-load', transformAndLoad);

export default router;
