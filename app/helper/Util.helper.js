const nodemailer = require('nodemailer');
const mustache = require('mustache')
const fs = require('fs')


function number_format(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

// console.log('Path of file in parent dir:', require('path').resolve(__dirname, "../public/va_template.html"));

function push_email(customer_email, invoice, link, account_number) {
  const template = fs.readFileSync(require('path').resolve(__dirname, "../../public/va_template.html"), 'utf8');

  const payload = {
    email: customer_email,
    invoice: invoice,
    url: link,
    account_number: account_number
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ahadadjr24@gmail.com',
        pass: 'efphwvtkbgcynpnu'
    }
  });

  var mailOptions = {
      from: 'ahadadjr24@gmail.com',
      to: customer_email,
      subject: 'Akesushi Restaurant INVOICE : ' + invoice,
      html: mustache.render(template, { ...payload })
  };

  transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
  });
}

module.exports = {
  number_format,
  push_email
}