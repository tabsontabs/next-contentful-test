export default async function (req, res) {

    // const PASSWORD = process.env.NEXT_PUBLIC_EMAIL_PASSWORD

    // let nodemailer = require('nodemailer')

    // const transporter = nodemailer.createTransport({
    //     port: 465,
    //     host: "smtp.gmail.com",
    //     auth: {
    //         user: 'compoundcontactform@gmail.com',
    //         pass: PASSWORD,
    //     },
    //     secure: true,
    // })

    // const mailData = {
    //     from: 'compoundcontactform@gmail.com',
    //     to: 'tabitha@vitalydesign.com',
    //     subject: `Contact Form Submission from ${req.body.name}`,
    //     text: req.body.message + " | Sent from:" + req.body.email,
    //     html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    // }

    // transporter.sendMail(mailData, function (err, info) {
    //     if(err)
    //         console.log(err)
    //     else
    //         console.log(info)
    // })

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'tabitha@vitalydesign.com',
        from: 'tabitha@vitalydesign.com',
        subject: `${req.body.name}`,
        text: `${req.body.message}`
    };

    await sgMail
    .send(msg)
    .then(() => {
        console.log('email sent')
    })
    .catch((error) => {
        console.error("error", error)
    });

    // sgMail
    // .send(msg)
    // .then(() => {}, error => {
    //     console.error(error);

    //     if (error.response) {
    //     console.error(error.response.body)
    //     }
    // });

    console.log(req.body)
    res.send('success')
}