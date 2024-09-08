const router = require('express').Router()
const {getPreferences,addPreferece} = require('../controllers/preferencesController')
const {protect} = require('../controllers/authController')

/**
 * @swagger
 * tags:
 *  name: User Prefereces
 *  description: Prefereces
 * /api/v1/preferences/${userId}:
 *  post:
 *      summary: Create a new Preferense
 *      tags: [Preferences]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/preferenses'
 *      responses:
 *          201:
 *              description: Preferense Created Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/preferenses'
 *          500:
 *              description: Internal server error
 * 
 *  get:
 *      summary: All Preferences by user
 *      tags: [Expenses]             
 *      responses:
 *          200:
 *              description: All User Preferences
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/preferenses'
 *          500:
 *              description: Internal Server Error
 */


router.get('/:userId',protect,getPreferences).patch('/:userId',protect,addPreferece)

module.exports = router