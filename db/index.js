const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/royale',{}, (err) => {
    if (err) 
        process.exit(42);
    console.log('DB successfully connected !!!');
});
