require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Section = require('../models/section');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(`${process.env.DB}`, connectionParams)
    .then(() => console.log('DB connection successful!'));

const material = JSON.parse(
    fs.readFileSync('../data/material.json', 'utf8'),
);

const importData = async () => {
    try {
        await Section.create(material);
        console.log('Data saved successfully');
        process.exit();
    } catch (e) {
        console.log(e);
    }
};

const deleteData = async () => {
    try {
        await Section.deleteMany();
        console.log('Data deleted successfully');
        process.exit();
    } catch (e) {
        console.log(e);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
