// src/index.js
import Tesseract from 'tesseract.js';
import '../styles.css';
// Add event listener for form submission
document.getElementById('userDetailsForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the uploaded ID document file
  const idDocumentFile = document.getElementById('idDocument').files[0];

  try {
    // Use Tesseract.js to perform OCR on the ID document
    const { data } = await Tesseract.recognize(idDocumentFile, 'eng', {
      logger: (m) => console.log(m)
    });
console.log({data});
    // Extract the relevant user details from the OCR output
    const { name, email } = extractUserDetails(data.text);

    // Populate the form fields with the OCR data
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
  } catch (error) {
    console.error('Error processing the ID document:', error);
  }
});

// Helper function to extract user details from the OCR output
function extractUserDetails(ocrText) {
  // Implement your own logic to extract name, email, and other details from the OCR text
  const nameMatch = ocrText.match(/Name:\s*(\w+\s\w+)/);
  const emailMatch = ocrText.match(/Email:\s*(\w+@\w+\.\w+)/);

  return {
    name: nameMatch ? nameMatch[1] : '',
    email: emailMatch ? emailMatch[1] : ''
  };
}