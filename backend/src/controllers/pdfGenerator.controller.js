import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

exports.generatePDFWithQRCode = async (req, res) => {
    const { data } = req.body;
    const pdfPath = path.join(__dirname, '../../public/temp/output.pdf');
    const qrPath = path.join(__dirname, '../../public/temp/qr.png');

    try {
        // Generate QR Code
        await QRCode.toFile(qrPath, data);

        // Generate PDF
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.text('Generated PDF with QR Code', { align: 'center' });
        doc.text(`Data: ${data}`, { align: 'center' });
        doc.image(qrPath, { fit: [150, 150], align: 'center' });

        doc.end();

        res.status(200).json({ message: "PDF with QR code generated successfully", path: pdfPath });
    } catch (err) {
        res.status(500).json({ message: "Failed to generate PDF", error: err.message });
    }
};