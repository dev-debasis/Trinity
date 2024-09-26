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

    const tempDir = path.join(__dirname, '../../public/temp');
    const pdfPath = path.join(tempDir, 'output.pdf');
    const qrPath = path.join(tempDir, 'qr.png');

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
        doc.pipe(fs.createWriteStream(pdfPath));

        // Add header text ("Developed by Team HackOver" at the top center)
        doc
            .fontSize(20)
            .text('Developed by Team HackOver', { align: 'center', underline: true, lineGap: 10 });

        // Add additional formatted text in the center
        doc
            .moveDown(2)
            .fontSize(14)
            .text(`Data: ${data}`, { align: 'center', lineGap: 20 });

        // Calculate the positioning for the QR code to ensure it's centered
        const qrImageSize = 150;
        const pageWidth = doc.page.width;
        const qrPositionX = (pageWidth - qrImageSize) / 2;

        // Add the QR code image to the PDF (centered)
        doc.image(qrPath, qrPositionX, doc.y, { fit: [qrImageSize, qrImageSize] });

        // End the PDF document
        doc.end();

        // Clean up the QR code file after PDF generation
        doc.on('finish', () => {
            fs.unlinkSync(qrPath); // Delete the temporary QR code
        });

        res
        .download("/DevInnov8/backend/public/", 'output.pdf', (err) => {
            if (err) {
                res.status(500).json({ message: "Failed to download PDF", error: err.message });
            }
        })
        .status(200)
        .json({ message: "PDF with QR code generated successfully", path: pdfPath });
    } catch (err) {
        res.status(500).json({ message: "Failed to generate PDF", error: err.message });
    }
};
