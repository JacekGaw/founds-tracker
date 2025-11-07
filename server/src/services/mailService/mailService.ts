import nodemailer, { Transporter } from "nodemailer";

export const testTransporter = async (): Promise<void> => {
  const transporter = createTransporter();
  if (transporter instanceof Error) {
    console.error("Failed to create transporter:", transporter.message);
    return;
  }
  const transporterTest = await transporter.verify();
  console.log("Mail transporter running: ", transporterTest);
};

export const createTransporter = (): Transporter | Error => {
  const service = process.env.MAIL_SERVICE;
  const host = process.env.MAIL_HOST;
  const port = process.env.MAIL_PORT;
  const secure = process.env.MAIL_SECURE;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;

  if (!service || !host || !port || !secure || !user || !pass) {
    return new Error("Transporter not created. Env value missing.");
  }

  const transportConfig = {
    service,
    host,
    port: parseInt(port),
    secure,
    auth: {
      user,
      pass,
    },
  } as nodemailer.TransportOptions;

  return nodemailer.createTransport(transportConfig);
};

export const sendEmail = async (
  subject: string,
  content: string,
  recipient: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    if (transporter instanceof Error) {
      console.error("Failed to create transporter:", transporter.message);
      return false;
    }

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: recipient,
      subject: subject,
      text: content,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return true;
  } catch (err) {
    console.error("Failed to send email:", err);
    return false;
  }
};
