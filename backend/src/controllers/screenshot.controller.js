import puppeteer from 'puppeteer';

export const captureScreenshot = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const screenshot = await page.screenshot({ encoding: 'base64' });
        await browser.close();

        res.status(200).json({ screenshot });
    } catch (error) {
        res.status(500).json({ error: "Failed to capture screenshot" });
    }
};
