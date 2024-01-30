import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// accepting data in a jason format
app.use(express.json({ limit: "16kb" }));
// accepting data from a url

app.use(express.urlencoded({ extended: true, limit: "20kb" }));

//storing pdf files,images,favicon

app.use(express.static("public"));

app.use(cookieParser());
export { app };
