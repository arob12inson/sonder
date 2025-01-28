import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const audioRouter = Router();

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR);
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

audioRouter.post("/", upload.single("audio"), (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File | undefined;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return
  }

  console.log("Audio file uploaded:", file);

  res.status(200).json({
    message: "Audio file uploaded successfully!",
    file: {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    },
  });
  return;
});

export default audioRouter;
