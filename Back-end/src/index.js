const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Phải có để gửi thông tin xác thực
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.options('*', cors());

const port = process.env.PORT || 3000;

routes(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(`mongodb+srv://phutrieuson:${process.env.MONGO_DB}@money-manager.l4b3dxe.mongodb.net/`)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});