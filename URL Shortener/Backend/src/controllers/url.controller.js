import urlModel from "../models/url.model.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const { originalUrl } = req.body;

  const shortId = nanoid(6);

  const url = await urlModel.create({
    originalUrl,
    shortId
  });

  res.status(200).json({
    shortUrl:`http://localhost:3000/api/${shortId}`,
    url
  });
};

export async function getUrl(req,res){
    const { shortId } = req.params;
    const url = await urlModel.findOne({ shortId });
    if(!url){
        return res.status(404).json({
            message:"URL not found."
        })
    }
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
}