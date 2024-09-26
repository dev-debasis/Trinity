import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const captureScreenshot = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        });
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        const screenshotsDir = join(__dirname, 'screenshots');
        // Create the screenshots directory if it doesn't exist
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        const imagePath = join(screenshotsDir, `${Date.now()}.png`);

        await page.screenshot({
            path: imagePath,
            fullPage: true
        });

        console.log(`Screenshot saved at: ${imagePath}`);

        res.status(200).json({
            message: "Screenshot captured successfully",
            imagePath // Returning the path of the saved screenshot
        });

    } catch (error) {
        console.error("Error capturing screenshot: ", error);
        res.status(500).json({ error: "Failed to capture screenshot", details: error.message });
    } finally {
        if (browser) {
            await browser.close(); // Ensure browser closes even if an error occurs
        }
    }
};