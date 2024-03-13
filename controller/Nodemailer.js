import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
    auth:{
        user:'software_india@diveroid.com',
        pass:'fdxjncungqeuhiay'
    }
})
export default transporter