import multer from "multer";
import fs from 'fs';
import path from 'path';



const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Ensure the folder exists


const folderPath = path.join(process.cwd(), "api", "Upload", "temp");
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}
console.log(folderPath);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })