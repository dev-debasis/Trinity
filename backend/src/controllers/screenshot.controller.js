import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const captureScreenshot = async (req, res) => {
    const { url } = req.body;

    // Validate the URL
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    let browser;
    let imagePath = null;
    try {
        // Launch Puppeteer
        browser = await puppeteer.launch({
            headless: true,
        });

        // Create a new page and set the viewport
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        });

        // Navigate to the URL
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000, // Timeout after 60 seconds
        });

        // Directory for saving screenshots
        const screenshotsDir = join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }

        // Define the path to save the screenshot
        imagePath = join(screenshotsDir, `${Date.now()}.png`);

        // Capture the screenshot
        await page.screenshot({
            path: imagePath,
            fullPage: true
        });

        console.log(`Screenshot saved at: ${imagePath}`);

        // Set headers to indicate file download
        res.setHeader('Content-Disposition', `attachment; filename=screenshot.png`);

        // Send the file for download
        res.download(imagePath, 'screenshot.png', (err) => {
            if (err) {
                console.error("Error downloading the screenshot:", err);
                return res.status(500).json({ error: "Failed to download screenshot", details: err.message });
            }

            // Delete the screenshot file after download
            fs.unlinkSync(imagePath);
        });

    } catch (error) {
        console.error("Error capturing screenshot: ", error);
        res.status(500).json({ error: "Failed to capture screenshot", details: error.message });
    } finally {
        // Ensure the browser is closed
        if (browser) {
            await browser.close();
        }

        // In case of an error or interruption, delete the file if it was created
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
};
