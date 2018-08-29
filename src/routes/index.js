"use strict";

import express from 'express';
import v1 from '../controllers/v1';
import v2 from '../controllers/v2';

const router = express.Router();
router.use('/v1', v1);
router.use('/v2', v2);

export default router;