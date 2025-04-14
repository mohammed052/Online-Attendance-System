// ENV 
require('dotenv').config();
const mongoose = require('mongoose');
adminRoutes = require('./routes/adminRoutes');
teacherRoutes = require('./routes/teacherRoutes');  
studentRoutes = require('./routes/studentRoutes');
userRoutes = require('./routes/userRoutes')
const express = require('express');



// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use('/api/admin/', adminRoutes);
app.use('/api/teacher/', teacherRoutes);
app.use('/api/student/', studentRoutes);
app.use('/api/user/',userRoutes);

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
  .then((result) => {
    // listening for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & Server is listening on port', process.env.PORT)
      // console.log(result)
    })
  })
  .catch((err) => console.log(err));

