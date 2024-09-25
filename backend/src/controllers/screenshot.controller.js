import puppeteer from "puppeteer"
import path from "path"

captureScreenshot = async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required" });

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        const screenshotPath = path.join(__dirname, '../../public/temp/screenshot.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();
        
        res.status(200).json({ message: "Screenshot captured successfully", path: screenshotPath });
    } catch (err) {
        res.status(500).json({ message: "Failed to capture screenshot", error: err.message });
    }
}

export { captureScreenshot }