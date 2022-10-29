const nodemailer = require("nodemailer");
const cron = require('node-cron');
const app = require("./src/app");

const periodicPaymentsService = app.service("/api/periodicpayments")
const householdsService = app.service("/api/households")
const householdmembersService = app.service("/api/householdmembers")
const usersService = app.service("/users")

// let data = []
// periodicPaymentsService.find({}).then(res =>
// {
//     data.push([...res.data]);
//     console.log(data)

// }).catch(e => console.log(e))

async function getAllData()
{
    const dataPE = await periodicPaymentsService.find({})
    const dataHH = await householdsService.find({})
    const dataHM = await householdmembersService.find({})
    const dataUser = await usersService.find({})

    let ar = []
    dataPE.data.map(pe =>
    {
        dataHM.data.map(hm =>
        {
            if (pe.household.toString() === hm.household.toString())
            {
                const username = dataUser.data.find(u => u._id.toString() === hm.user.toString())
                const household = dataHH.data.find(h => h._id.toString() === pe.household.toString())
                const primaryuser = dataUser.data.find(u => u._id.toString() === household.createdBy.toString())
                ar.push(username.email)
                ar.push(primaryuser.email)
            }
        })
    })
    console.log(ar)
}

getAllData()
let mailOptions = {
    from: '"noreply@exms.com" <sidheshp@valueaddsofttech.com>',
    to: 'sidheshparab34@gmail.com',  // separated by comma like: "abc@g.com, xyz@h.com"
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send SIDHESH'
};
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: app.get("auth_user"),
        pass: app.get("auth_pass")
    }
});

// cron.schedule('* * * * *', () =>
// {
//     // Send e-mail
//     transporter.sendMail(mailOptions, function (error, info)
//     {
//         if (error)
//         {
//             console.log(error);
//         } else
//         {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// });



