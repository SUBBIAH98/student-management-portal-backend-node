require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/course', courseRoutes);
app.use('/dashboard', dashboardRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const port = process.env.PORT || 3000;

async function start() {
    try {
        await sequelize.authenticate();
        // do not force: do not drop tables in production
        await sequelize.sync({ alter: true }); // alter:true will try to match DB to models (ok for dev)
        console.log('DB connected and synced');
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error('Unable to start server:', err);
        process.exit(1);
    }
}

start();
