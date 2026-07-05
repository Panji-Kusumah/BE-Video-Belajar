import express from 'express';
import {
    getMyEnrollments,
    getEnrollmentByCourse,
    updateProgress,
    getEnrollmentStats,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Semua route di sini butuh login

router.get('/', getMyEnrollments);
router.get('/stats', getEnrollmentStats);
router.get('/:courseId', getEnrollmentByCourse);
router.put('/:courseId/progress', updateProgress);

export default router;