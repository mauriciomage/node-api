const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env and vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

// Connect to DB
const conn = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootscamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootscamps);
    await Course.create(courses);

    console.log(`data imported...` .green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log(`data deleted...` .red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// run: node seeder -i
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') { // run: node seeder -d
  deleteData()
}