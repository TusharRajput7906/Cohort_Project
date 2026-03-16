import React, { useEffect, useState } from "react";
import { generateQR } from "./api.route";
import "./Form.css";

const Form = () => {
    const [url, setUrl] = useState("");
    const [qrImageUrl, setQrImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function isValidHttpUrl(value) {
        try {
            const parsed = new URL(value);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
            return false;
        }
    }

    useEffect(() => {
        return () => {
            if (qrImageUrl) {
                URL.revokeObjectURL(qrImageUrl);
            }
        };
    }, [qrImageUrl]);

    useEffect(() => {
        if (!success) {
            return;
        }

        const timer = setTimeout(() => {
            setSuccess("");
        }, 2200);

        return () => clearTimeout(timer);
    }, [success]);

    async function handleSubmit(e) {
        e.preventDefault();

        const cleanUrl = url.trim();

        if (!cleanUrl) {
            setError("Please enter a URL");
            setSuccess("");
            return;
        }

        if (!isValidHttpUrl(cleanUrl)) {
            setError("Enter a valid URL that starts with http:// or https://");
            setSuccess("");
            return;
        }

        try {
            setError("");
            setSuccess("");
            setIsLoading(true);

            const response = await generateQR({ url: cleanUrl });
            const objectUrl = URL.createObjectURL(response.data);

            if (qrImageUrl) {
                URL.revokeObjectURL(qrImageUrl);
            }

            setQrImageUrl(objectUrl);
            setSuccess("QR code generated successfully");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to generate QR code");
            setSuccess("");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="form-container">
            <form className="qr-form" onSubmit={handleSubmit}>
                <h1>QR Code Generator</h1>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) {
                            setError("");
                        }
                    }}
                    placeholder="Enter URL"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate QR"}
                </button>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-toast">{success}</p>}

                {qrImageUrl && (
                    <div className="qr-result">
                        <img src={qrImageUrl} alt="Generated QR code" className="qr-image" />
                        <a href={qrImageUrl} download="qr-code.png" className="download-link">
                            Download PNG
                        </a>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
