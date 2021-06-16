export default async function (req, res) {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'careers@vitalydesign.com',
        from: 'tabitha@vitalydesign.com',
        subject: `Contact Form Submission from ${req.body.name}`,
        text: req.body.message + " | Sent from:" + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    };

    await sgMail
    .send(msg)
    .then(() => {
        console.log('email sent')
    })
    .catch((error) => {
        console.error("error", error)
    });
    
    res.send('success')
}