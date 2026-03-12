import urlModel from "../models/url.model.js";
import { nanoid } from "nanoid";

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function createShortUrl(req, res) {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required." });
    }
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ message: "Invalid URL. Must start with http:// or https://" });
    }

    const shortId = nanoid(6);
    const url = await urlModel.create({ originalUrl, shortId });

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    res.status(201).json({
      shortUrl: `${baseUrl}/api/${shortId}`,
      url,
    });
  } catch (err) {
    console.error("createShortUrl error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function getUrl(req, res) {
  try {
    const { shortId } = req.params;
    const url = await urlModel.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ message: "URL not found." });
    }
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("getUrl error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
}