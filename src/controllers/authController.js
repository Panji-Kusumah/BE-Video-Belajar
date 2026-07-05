import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
            },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Email atau password salah' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Email atau password salah' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login berhasil',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Current User
export const getMe = async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                role: true,
                created_at: true,
            },
        });

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { name, phone, avatar } = req.body;

        const user = await prisma.users.update({
            where: { id: req.user.userId },
            data: {
                name,
                phone,
                avatar,
            },
        });

        res.json({
            success: true,
            message: 'Profil berhasil diupdate',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};