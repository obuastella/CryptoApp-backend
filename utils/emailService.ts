import nodemailer from "nodemailer";

const createTransporter = (email: string, password: string) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
};

// Welcome email 
export const sendWelcomeEmail = async (userDetails: any) => {
  const { email, firstName } = userDetails;

  const subject = "Welcome to Cryptonarybit!";
  const text = `
    Dear ${firstName},

    Welcome to cryptonarybit! We're excited to have you on board.

    Best regards,
    cryptonarybit Team
  `;

  const mailOptions = {
    from: process.env.WELCOME_EMAIL_USER,
    to: email,
    subject,
    text,
  };

  const transporter = createTransporter(
    process.env.WELCOME_EMAIL_USER!,
    process.env.WELCOME_EMAIL_PASS!
  );

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to user");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

//Transaction Email
export const sendTransactionEmail = async (transactionDetails: any, userDetails: any) => {
  const { type, amount, currency, date, status, externalWallet, duration } = transactionDetails;
  const { email, firstName, lastName } = userDetails;

  let subject = `New ${type} transaction`;
  let text = `
    Transaction Details:
    Type: ${type}
    Amount: ${amount} ${currency}
    Date: ${date}
    Status: ${status}
    Duration: ${duration}

    User Details:
    Name: ${firstName} ${lastName}
    Email: ${email}
  `;

  if (type === "withdrawal" && externalWallet) {
    text += `\nExternal Wallet: ${externalWallet}`;
  }

  const mailOptions = {
    from: process.env.TRANSACTION_EMAIL_USER,
    replyTo: email,
    to: "cryptonarybit@gmail.com",
    subject,
    text,
  };

  const transporter = createTransporter(
    process.env.TRANSACTION_EMAIL_USER!,
    process.env.TRANSACTION_EMAIL_PASS!
  );

  try {
    await transporter.sendMail(mailOptions);
    console.log("Transaction email sent to admin");
  } catch (error) {
    console.error("Error sending transaction email:", error);
  }
};