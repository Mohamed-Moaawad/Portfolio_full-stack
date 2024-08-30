const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
const { updatePage, getPage } = require('../Controllers/PageConroller');
const authMiddleware = require('../Middlewares/authMiddleware');
const uploadHandler = require('../Middlewares/MulterConfig');

router.post('/dashboard/:pageName', uploadHandler.any(), updatePage);

router.get('/:pageName', getPage);

app.use('/uploads/:pageName', (req, res, next) => {
    const pageName = req.params.pageName;
    express.static(path.join(__dirname, `../public/uploads/${pageName}`))(req, res, next);
});

module.exports = router;
