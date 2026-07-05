import prisma from '../config/prisma.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.courses.findMany();
        res.json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await prisma.courses.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
        res.json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};