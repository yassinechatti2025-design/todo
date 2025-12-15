import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5001;



// app.use( (req,res,next) => {
//   console.log('request method is',req.method,'request url is',req.url);next();
// }); 
const corsOpts = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

app.use(express.json());

app.use(rateLimiter);


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running on PORT :", PORT);
});
});

