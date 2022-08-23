import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
   res.redirect("/api/v1/orders");
});
  
router.get("/api", (req, res) => {
   res.redirect("/api/v1/orders");
});
  
router.get("/api/v1", (req, res) => {
   res.redirect("/api/v1/orders");
});

export default router;