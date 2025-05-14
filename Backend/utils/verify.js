const Verifier = require('email-verifier');

// Replace YOUR_API_KEY with your actual MailboxLayer API key
let verifier = new Verifier('at_cNcirNmIRgS8F2eZ06ZNvrFgQAqeP');

verifier.verify('r@degree.com', (err, data) => {
  if (err) {
    console.error('❌ Error verifying email:', err);
  } else {
    console.log('✅ Verification result:', data);
  }
});
