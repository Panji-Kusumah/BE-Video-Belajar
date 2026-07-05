import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Memulai seeding database...');

    const courses = await Promise.all([
        prisma.courses.create({
            data: {
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
                title: 'Pengantar Pemrograman Web',
                description: 'Belajar dasar-dasar HTML, CSS, dan JavaScript untuk pemula absolut.',
                instructor: 'Andi Pratama',
                role: 'Web Developer di Gojek',
                instructorImage: 'https://i.pravatar.cc/150?img=20',
                rating: 4.6,
                reviews: 3250,
                price: 0,
                category: 'Digital & Teknologi',
                duration: 'Kurang dari 4 Jam',
                isFree: true,
            },
        }),
        prisma.courses.create({
            data: {
                image: 'https://images.unsplash.com/photo-1542831371-29b0f0765816?w=400&h=250&fit=crop',
                title: 'Dasar-Dasar Python untuk Data Science',
                description: 'Kuasai fundamental Python untuk Data Science.',
                instructor: 'Siti Nurhaliza',
                role: 'Data Scientist di Tokopedia',
                instructorImage: 'https://i.pravatar.cc/150?img=21',
                rating: 4.7,
                reviews: 2890,
                price: 499000,
                originalPrice: 999000,
                category: 'Digital & Teknologi',
                duration: '4 - 8 Jam',
                isFree: false,
            },
        }),
        prisma.courses.create({
            data: {
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
                title: 'Fullstack JavaScript Bootcamp',
                description: 'Jadi Fullstack Developer dengan Node.js dan React.',
                instructor: 'Budi Santoso',
                role: 'Senior Engineer di Shopee',
                instructorImage: 'https://i.pravatar.cc/150?img=33',
                rating: 4.9,
                reviews: 5120,
                price: 799000,
                originalPrice: 1500000,
                category: 'Digital & Teknologi',
                duration: 'Lebih dari 8 Jam',
                isFree: false,
            },
        }),
    ]);

    console.log(`✅ Berhasil masukin ${courses.length} courses!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });