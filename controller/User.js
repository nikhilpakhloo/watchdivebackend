import User from "../models/UserSchema.js";
import transporter from "./Nodemailer.js";

  async function createUser(req, res) {
    try {
      const { name, email, phone, referral } = req.body;
      const existingUserWithEmail = await User.findOne({ email });
      const existingUserWithPhone = await User.findOne({ phone });

      if (existingUserWithEmail || existingUserWithPhone) {
        return res
          .status(400)
          .json({ message: "Email or phone number already exists." });
      }

      function generateReferralCode(length) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }

        return code;
      }

      if (referral) {
        const existingReferralUser = await User.findOne({
          refferalcode: referral,
        });
        if (existingReferralUser) {
          existingReferralUser.totalpoints += 10;
          await existingReferralUser.save();
        }
      }

      const refferalcode = await generateReferralCode(10);
      const newUser = new User({
        name,
        email,
        phone,
        refferalcode,
        totalpoints: 0,
      });
      const savedUser = await newUser.save();

      const welcomeEmail = {
        from: "gramtest60@gmail.com",
        to: email,
        subject: "Welcome to WatchDive",
        html: `
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <link rel="stylesheet" href="style.css">
  
</head>
<body>
    <div class="container">
        <div style="border: 1px solid #eaeaea; border-radius: 20px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; width: 465px;">
            <div style="margin-top: 32px; text-align: center;">
                <img src="https://ksr-ugc.imgix.net/assets/027/297/162/1040f11f9794575082f8491fd87d6809_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1574361458&gif-q=50&lossless=true&s=04927970cfbf590232da8ad2ddf2760e" alt="Vercel" width="100%" height="100%" style="display: block; margin: 0 auto; object-fit: cover;">
            </div>
            <p style="color: #000; font-size: 14px; line-height: 24px; text-align: center;">
                Dear <strong>${name}</strong>,
            </p>
            <p style="color: #000; font-size: 14px; line-height: 24px; text-align: center;">
                <strong><a href="https://en.diveroid.com/" style="color: #000; text-decoration: none;">Diveroid</a></strong> has invited you to join in Unveiling Something Extraordinary:
                <strong><a href="https://www.kickstarter.com/" style="color: #000; text-decoration: none;">Kickstarter</a></strong> Launch in <strong>February!</strong>
            </p>
            
          
            <p>Your referral code is <span id="referralCode"> <strong>${refferalcode}</strong></span></p>
        
            <p></p>
            <p style="color: #000; font-size: 14px; line-height: 24px;">
                or copy and paste this URL into your browser:
                <a href="https://www.kickstarter.com/projects/officialdiveroid" style="color: #007bff; text-decoration: none;">https://www.kickstarter.com/projects/officialdiveroid</a>
            </p>
            <hr style="border: 1px solid #eaeaea; margin-top: 26px; margin-bottom: 26px; margin-left: 0; width: 100%;">
            <p style="color: #666666; font-size: 12px; line-height: 24px;">
                This invitation was intended for <span style="color: #000;">Diver</span>. This invite was sent from
                <span style="color: #000;">124.20.12.12</span> located in <span style="color: #000;">Korea</span>. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.
            </p>
        </div>
    </div>
</body>
</html>

    `,
      };

      transporter.sendMail(welcomeEmail, (error, info) => {
        if (error) {
          console.error("Error sending welcome email:", error);
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Welcome email sent:", info.response);
          res.status(201).json(savedUser);
        }
      });

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

export default createUser;