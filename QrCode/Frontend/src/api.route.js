import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false
});

export async function generateQR({ url }) {
    const image = await api.post("/api/generate-qr", { url }, { responseType: "blob" });
    return image;
}