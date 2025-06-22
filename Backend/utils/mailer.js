const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendReservationMail = (to, nomEspace, dateDebut, dateFin) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmation de réservation',
    html: `
      <p>Bonjour,</p>
      <p>Votre réservation de l’espace <strong>${nomEspace}</strong> a été confirmée.</p>
      <p>📅 Du <strong>${new Date(dateDebut).toLocaleString()}</strong> au <strong>${new Date(dateFin).toLocaleString()}</strong></p>
      <p>Merci pour votre confiance.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

exports.sendAnnulationMail = (to, nomEspace, dateDebut, dateFin) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Annulation de réservation',
    html: `
      <p>Bonjour,</p>
      <p>Votre réservation de l’espace <strong>${nomEspace}</strong> du <strong>${new Date(dateDebut).toLocaleString()}</strong> au <strong>${new Date(dateFin).toLocaleString()}</strong> a été <span style="color:red;"><strong>annulée</strong></span>.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
