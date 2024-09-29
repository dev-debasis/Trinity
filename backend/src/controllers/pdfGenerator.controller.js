import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to check if the string is a valid URL
const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

// Function to generate the PDF with a QR code
export const generatePdfWithQr = async (req, res) => {
    const { data } = req.body;
    console.log(req)

    const tempDir = path.join(__dirname, '../../public/temp');
    const pdfPath = path.join(tempDir, 'output.pdf');
    const qrPath = path.join(tempDir, 'qr.png');
    console.log(req.body)
    try {
        // Ensure the temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Generate QR Code (check if it's a URL or just text)
        const qrData = isValidUrl(data) ? data : `Text: ${data}`;
        await QRCode.toFile(qrPath, qrData);

        // Generate PDF
        const doc = new PDFDocument();

        // Pipe the output to a file
        const pdfWriteStream = await fs.createWriteStream(pdfPath);
        doc.pipe(pdfWriteStream);

        // Add header text ("Developed by Team HackOver" at the top center)
        doc
            .fontSize(20)
            .text('Developed by Team HackOver', { align: 'center', underline: true, lineGap: 10 
        });


        // Calculate the positioning for the QR code to ensure it's centered
        const qrImageSize = 150;
        const pageWidth = await doc.page.width;
        const qrPositionX = (pageWidth - qrImageSize) / 2;

        // Add the QR code image to the PDF (centered)
        doc.image(qrPath, qrPositionX, doc.y, { fit: [qrImageSize, qrImageSize] });

        // End the PDF document
        doc.end();

        // Ensure the PDF has fully finished writing before download
        pdfWriteStream.on('finish', () => {
            // Send the PDF file as a download
            res.sendFile(pdfPath, { headers: { 'Content-Disposition': 'attachment; filename=output.pdf' } }, (err) => {
                if (err) {
                    console.error("Failed to download PDF:", err);
                    return res.status(500).json({ message: "Failed to download PDF", error: err.message });
                }

                // Delete the PDF and QR code files after successful download
                // fs.unlinkSync(pdfPath);
                // fs.unlinkSync(qrPath);
            });
        });

        // Handle file writing errors
        pdfWriteStream.on('error', (err) => {
            console.error("Error writing PDF file:", err);
            res.status(500).json({ message: "Failed to write PDF", error: err.message });
        });

    } catch (err) {
        console.error("Error generating PDF:", err);
        res.status(500).json({ message: "Failed to generate PDF", error: err.message });
    }
};