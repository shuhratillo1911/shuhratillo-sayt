const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Static files uchun

// Email transport yaratish
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Kontakt formani qayta ishlash
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Email jo'natish
        const mailOptions = {
            from: process.env.EMAIL,
            to: 'shuxratillofayzullayev@gmail.com',
            subject: `Yangi xabar: ${name}`,
            text: `
                Kimdan: ${name}
                Email: ${email}
                Xabar: ${message}
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Xabar muvaffaqiyatli yuborildi' });
    } catch (error) {
        console.error('Xato:', error);
        res.status(500).json({ error: 'Xabar yuborishda xatolik yuz berdi' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
}); 