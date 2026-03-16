import QRCode from "qrcode";

export const generateQR = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      message: "URL is required",
    });
  }

  try {
    const qrBuffer = await QRCode.toBuffer(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    return res.send(qrBuffer);
  } catch (err) {
    return res.status(500).json({
      message: "QR generation failed",
    });
  }
};
