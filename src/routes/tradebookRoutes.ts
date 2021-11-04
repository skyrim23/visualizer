import * as express from "express";
import { addTrade, getTradeBook, postTradeBook } from "../controllers/tradebookControllers";
import multer from "multer";
const upload = multer({dest: 'uploads/'});

export default (router: express.Router) => {
  router.get("/tradebook", getTradeBook);
  router.post('/tradebook/upload', upload.single('file'), postTradeBook);
  router.post('/trade', addTrade);
};
