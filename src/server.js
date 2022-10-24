const express = require('express');
const app = express();
const port = process.env.PORT||8080;

//-----------Cors------------------------------------------------
const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,            
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
//------------form-data-------------------------------------------


app.use(express.static('.'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
 
// app.use(upload.array()); 
// app.use(express.static('public'));
//----------------------------------------------------------------


app.listen(port, () => {
    console.log('Node server running @ http://localhost:' + port);
});

const rootRouter = require('./routes/index');
app.use('/api', rootRouter)




