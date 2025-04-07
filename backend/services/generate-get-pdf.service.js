import axios from "axios";
import fs from "fs";

export async function generateAndDownloadPdf() {
  try {
    const apiKey = "your-api-key";
    const response = await axios.post(
      "http://192.168.29.168:3001/pdf/generate",
      {
        project_name: "bailReckoner",
        design_file: "bailAppication.ejs",
        pdf_name: "BailApplication",
        template_data: {
          applicantName: "John Doe",
          applicantAddress: "123 Elm Street, Springfield, IL",
          contactNumber: "+1-555-123-4567",
          caseId: "CASE123456",
          courtName: "Springfield District Court",
          offense: "Theft",
          reasonForBail:
            "The applicant has no prior criminal record and has strong family ties to the community. Bail is requested to ensure the applicant can maintain employment and support their family during the legal proceedings.",
          submissionDate: "August 29, 2024",
        },

        should_replace: true,
        return_file: true,
      },
      {
        headers: {
          api_key: "APIKEY-ABC123",
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Save the PDF file
    fs.writeFileSync("GeneratedPDF.pdf", response.data);

    console.log("PDF generated and saved successfully.");
  } catch (error) {
    console.error("Error generating PDF:", error.message);
  }
}
