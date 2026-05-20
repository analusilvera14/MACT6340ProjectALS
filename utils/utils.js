import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",    //  critical fix
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    requireTLS: process.env.MAIL_TLS === "true",
  });

  let message = {
    from: process.env.MESSAGE_FROM,
    to: process.env.MESSAGE_TO,
    subject: sub,
    text: txt,
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent:", info.messageId);
  return info;
}
