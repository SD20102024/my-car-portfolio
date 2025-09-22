//
require("dotenv").config();
import express from "express";
import { createTransport } from "nodemailer";
import cors from "cors";
import { json } from "body-parser";

const app = express();
app.use(cors());
app.use(json());

// 📩 API endpoint to send email
app.post("/send-contact", async (req, res) => {
    const { contactName, contactNumber } = req.body;

    // Setup Nodemailer transporter with Gmail
    let transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Define email content
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,             // recipient (can be your same Gmail or another)
        subject: "New Contact Form Submission",
        text: `You received a new contact:\n\nName: ${contactName}\nPhone: ${contactNumber}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Email send failed:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`📡 Server running on port ${PORT}`));
