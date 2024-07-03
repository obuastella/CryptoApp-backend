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

  const subject = "Welcome to CryptonaryBit!";
  const text = `
  Dear ${firstName},
  

Welcome to CryptonaryBit!
  
We're absolutely thrilled to have you join our community. At CryptonaryBit, we're passionate about providing you with the best cryptocurrency experience possible, whether you're a seasoned trader or just starting your journey.

Here's what you can look forward to as a new member


Exclusive Insights: Stay ahead of the curve with our in-depth market analysis and expert predictions.

Real-Time Updates: Never miss a beat with our instant alerts and notifications on the latest trends and movements.

Comprehensive Tools: From advanced charting to personalized dashboards, we have all the tools you need to make informed decisions.

Supportive Community: Connect with like-minded individuals, share strategies, and grow together in our vibrant community.

We're committed to your success and are here to support you every step of the way. If you have any questions or need assistance, our dedicated support team is just a click away.

Thank you for choosing CryptonaryBit. Let's embark on this exciting journey together and conquer the crypto world!

  Best regards,
  The CryptonaryBit Team.
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
export const sendTransactionEmail = async (
  transactionDetails: any,
  userDetails: any
) => {
  const { type, amount, currency, date, status, externalWallet, duration } =
    transactionDetails;
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
