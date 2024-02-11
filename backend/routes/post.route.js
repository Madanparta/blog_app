import express from "express";
const route = express.Router();
import {verifyToken} from '../utils/verifyUser.js'
import { create } from "../controllers/post.controller.js";

route.post('/create',verifyToken,create);

export default route;