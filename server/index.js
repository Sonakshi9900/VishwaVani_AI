import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ✅ CORS (safe version)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Routes
app.use("/api", aiRoutes);

// ✅ Health check (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ Use dynamic port for deployment (Render/Vercel)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
