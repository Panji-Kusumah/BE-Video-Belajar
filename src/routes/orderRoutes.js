import express from 'express';
import {
    getMyOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Semua route di sini butuh login

router.get('/', getMyOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);

export default router;