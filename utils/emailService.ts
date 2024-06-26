import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: "cryptonarybit@gmail.com",
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Transaction email sent to admin");
  } catch (error) {
    console.error("Error sending transaction email:", error);
  }
};
