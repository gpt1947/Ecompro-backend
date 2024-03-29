import dotenv from "dotenv"
import {app} from './App.js'
import connectDB from "./db/iindex.js";


dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.get('/api/sx',(req,res)=>{
    res.send({"message":"server ghgjkgfhghkj  GAnpat SihfkjgdSH ready"})
})
app.get('/vhire',(req,res)=>{
    console.log("everythig is fine")
    res.send({})
})
