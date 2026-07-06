import prisma from '../config/prisma.js';

export const getMyOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const where = {
            userId: req.user.userId,
        };
        if (status) {
            where.status = status;
        }
        const orders = await prisma.orders.findMany({
            where,
            include: {
                order_items: {
                    include: {
                        courses: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
        });
        const total = await prisma.orders.count({ where });
        res.json({
            success: true,
            data: orders,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await prisma.orders.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.userId,
            },
            include: {
                order_items: {
                    include: {
                        courses: true,
                    },
                },
            },
        });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { courses, paymentMethod } = req.body;
        if (!courses || courses.length === 0) {
            return res.status(400).json({ success: false, message: 'Pilih minimal 1 course' });
        }
        const courseIds = courses.map(c => c.courseId);
        const courseData = await prisma.courses.findMany({
            where: { id: { in: courseIds } },
        });
        let totalAmount = 0;
        const orderItemsData = [];
        courseData.forEach(course => {
            totalAmount += course.price;
            orderItemsData.push({
                courseId: course.id,
                price: course.price,
            });
        });
        const invoiceNumber = `INV/${Date.now()}/${Math.floor(Math.random() * 1000)}`;
        const order = await prisma.orders.create({
            data: {
                invoiceNumber,
                userId: req.user.userId,
                totalAmount,
                paymentMethod,
                status: 'Menunggu',
                order_items: {
                    create: orderItemsData,
                },
            },
            include: {
                order_items: {
                    include: {
                        courses: true,
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: 'Pesanan berhasil dibuat',
            data: order,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await prisma.orders.update({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.userId,
            },
            data: { status },
        });
        if (status === 'Berhasil') {
            const orderItems = await prisma.order_items.findMany({
                where: { orderId: order.id },
            });
            const enrollments = orderItems.map(item => ({
                userId: req.user.userId,
                courseId: item.courseId,
                status: 'active',
            }));
            await prisma.enrollments.createMany({
                data: enrollments,
                skipDuplicates: true,
            });
        }
        res.json({
            success: true,
            message: 'Status pesanan berhasil diupdate',
            data: order,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};