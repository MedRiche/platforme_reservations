// testMailer.js
const { sendReservationMail, sendAnnulationMail } = require('./utils/mailer');
require('dotenv').config();
console.log('Email:', process.env.EMAIL_USER);
console.log('Pass:', process.env.EMAIL_PASS);

const test = async () => {
  try {
    await sendReservationMail(
      'tonemaildestinataire@gmail.com',
      'Salle Réunion A',
      new Date('2025-07-10T10:00:00'),
      new Date('2025-07-10T12:00:00')
    );

    console.log('✅ Email de réservation envoyé avec succès');

    await sendAnnulationMail(
      'tonemaildestinataire@gmail.com',
      'Salle Réunion A',
      new Date('2025-07-10T10:00:00'),
      new Date('2025-07-10T12:00:00')
    );

    console.log('✅ Email d’annulation envoyé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l’envoi des e-mails :', error);
  }
};

test();
