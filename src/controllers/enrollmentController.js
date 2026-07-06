import prisma from '../config/prisma.js';

export const getMyEnrollments = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const where = {
            userId: req.user.userId,
        };
        if (status) {
            where.status = status;
        }
        const enrollments = await prisma.enrollments.findMany({
            where,
            include: {
                courses: true,
            },
            orderBy: { enrolledAt: 'desc' },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
        });
        const total = await prisma.enrollments.count({ where });
        res.json({
            success: true,
            data: enrollments,
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

export const getEnrollmentByCourse = async (req, res) => {
    try {
        const enrollment = await prisma.enrollments.findFirst({
            where: {
                userId: req.user.userId,
                courseId: parseInt(req.params.courseId),
            },
            include: {
                courses: true,
            },
        });
        if (!enrollment) {
            return res.status(404).json({ success: false, message: 'Enrollment tidak ditemukan' });
        }
        res.json({ success: true, data: enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProgress = async (req, res) => {
    try {
        const { progress } = req.body;
        const enrollment = await prisma.enrollments.update({
            where: {
                userId_courseId: {
                    userId: req.user.userId,
                    courseId: parseInt(req.params.courseId),
                },
            },
            data: {
                progress,
                completedAt: progress === 100 ? new Date() : null,
                status: progress === 100 ? 'completed' : 'active',
            },
        });
        res.json({
            success: true,
            message: 'Progress berhasil diupdate',
            data: enrollment,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEnrollmentStats = async (req, res) => {
    try {
        const totalEnrollments = await prisma.enrollments.count({
            where: { userId: req.user.userId },
        });
        const completedEnrollments = await prisma.enrollments.count({
            where: {
                userId: req.user.userId,
                status: 'completed',
            },
        });
        const activeEnrollments = await prisma.enrollments.count({
            where: {
                userId: req.user.userId,
                status: 'active',
            },
        });
        res.json({
            success: true,
            data: {
                total: totalEnrollments,
                completed: completedEnrollments,
                active: activeEnrollments,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};