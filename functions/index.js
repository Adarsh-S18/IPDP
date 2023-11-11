/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions')
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp()
/* gmail  credentials */
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'evolversmarketing@gmail.com',
        pass: 'cstk skvy yfyo pyvx'
    }
});
exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
    cors(req, res, () => { 
    console.log(req.body)
    const mailOptions = {
        from: `evolversmarketing@gmail.com`,
        to: `evolversmarketing@gmail.com`,
        subject: 'Contact Form Message',
        html: `<h1>Contact Form Message</h1>
                            <p>
                               <b>Email: </b>${req.body.email}<br>
                               <b>First Name: </b>${req.body.firstName}<br>
                                <b>Last Name: </b>${req.body.lastName}<br>
                                <b>Mobile Number: </b>${req.body.phone}<br>
                               <b>Message: </b>${req.body.message}<br>
                            </p>`
    };
    return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            return res.send(error.toString());
        }
        var data = JSON.stringify(data)
        return res.send(`Sent! ${data}`);
    });
})
});