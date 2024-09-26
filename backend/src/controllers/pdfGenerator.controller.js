import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { ApiError } from "../utils/APiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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

        const instance = await uploadOnCloudinary(pdfPath);
        if(!instance.url){
            throw new ApiError(500, "something went wrong while uploading on cludinary")
        }
        res
        .status(200)
        .json(
            new ApiResponse(200, instance.url, 'conversion done')
        )

        // Send the PDF file as a download
        // res.download(outputPath, 'output.pdf', (err) => {
        //     if (err) {
        //         console.error("Failed to download PDF:", err);
        //         return res.status(500).json({ message: "Failed to download PDF", error: err.message });
        //     }

        //     // Optionally, you can also delete the PDF file after download
        //     fs.unlinkSync(pdfPath);
        // });

    } catch (err) {
        console.error("Error generating PDF:", err);
        res.status(500).json({ message: "Failed to generate PDF", error: err.message });
    }
};
