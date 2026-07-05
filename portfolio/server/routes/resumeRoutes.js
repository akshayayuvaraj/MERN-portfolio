const express = require('express')
const router = express.Router()
const { downloadResume, getDownloadCount } = require('../controllers/resumeController')

router.get('/download', downloadResume)
router.get('/count', getDownloadCount)

module.exports = router