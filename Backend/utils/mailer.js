  require('dotenv').config(); // à ajouter si pas déjà fait

  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('Erreur de connexion SMTP :', error);
    } else {
      console.log('Connexion SMTP réussie');
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
