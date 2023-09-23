

const express = require('express');
const app = express();
const PORT = 5001;
const cors = require('cors')
//available Routes
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("iNOtebook backend Server listening on PORT", PORT);
});
const connecttoMongo = require('./db')
 connecttoMongo();