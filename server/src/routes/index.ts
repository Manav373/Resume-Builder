import { Router } from "express";
import resumeRoutes from "./resumes";
import aiRoutes from "./ai";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

router.use("/resumes", resumeRoutes);
router.use("/ai", aiRoutes);

export default router;
