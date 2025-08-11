require('dotenv').config(); // Charger les variables d'environnement
const nodemailer = require('nodemailer');

// ✅ Création du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Ton adresse email
    pass: process.env.EMAIL_PASS  // Ton mot de passe ou App Password
  }
});

// ✅ Vérification de la connexion SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur de connexion SMTP :', error);
  } else {
    console.log('✅ Connexion SMTP réussie');
  }
});

// 📩 Email : Confirmation de réservation lors de la création
exports.sendReservationMail = (to, nomEspace, dateDebut, dateFin) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmation de réservation',
    html: `
      <p>Bonjour,</p>
      <p>Votre réservation de l’espace <strong>${nomEspace}</strong> a été enregistrée.</p>
      <p>📅 Du <strong>${new Date(dateDebut).toLocaleString()}</strong> au <strong>${new Date(dateFin).toLocaleString()}</strong></p>
      <p>Merci pour votre confiance.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

// 📩 Email : Annulation de réservation
exports.sendAnnulationMail = (to, nomEspace, dateDebut, dateFin) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Annulation de votre réservation',
    html: `
      <p>Bonjour,</p>
      <p>Votre réservation de l’espace <strong>${nomEspace}</strong> a été annulée.</p>
      <p>📅 Elle devait avoir lieu du <strong>${new Date(dateDebut).toLocaleString()}</strong> au <strong>${new Date(dateFin).toLocaleString()}</strong>.</p>
      <p>Nous espérons vous revoir bientôt.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

// 📩 Email : Confirmation du statut par un administrateur
exports.sendConfirmationStatutMail = (to, nomEspace, dateDebut, dateFin) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Votre réservation a été confirmée',
    html: `
      <p>Bonjour,</p>
      <p>Votre réservation de l’espace <strong>${nomEspace}</strong> a été confirmée par l’administrateur.</p>
      <p>📅 Du <strong>${new Date(dateDebut).toLocaleString()}</strong> au <strong>${new Date(dateFin).toLocaleString()}</strong></p>
      <p>Merci pour votre confiance.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};
