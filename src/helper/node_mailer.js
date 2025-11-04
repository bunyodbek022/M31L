import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: `"Bunyodbek G'ulomjonov" <${process.env.GOOGLE_MAIL}>`,
    to: 'sirojiddinoyosboyev@gmail.com',
    subject: 'Hello',
    html: '<b>Salom nima gap</b>',
  });

  console.log('message send: ', info.messageId);
  console.log({ info });
})();
