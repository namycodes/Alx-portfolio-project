const router = require('express').Router()
const {getAllUserExpenses, createExpense} = require('../controllers/expensesController')
const {protect} = require('../controllers/authController')

/**
 * @swagger
 * tags:
 *  name: Expenses
 *  description: Expenses
 * /api/v1/expenses/${userId}:
 *  post:
 *      summary: Create a new Expense
 *      tags: [Expenses]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/expenses'
 *      responses:
 *          201:
 *              description: Expense Created Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/expenses'
 *          500:
 *              description: Internal server error
 * 
 *  get:
 *      summary: All Expenses by user
 *      tags: [Expenses]             
 *      responses:
 *          200:
 *              description: All User Expenses
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/expenses'
 *          500:
 *              description: Internal Server Error
 */


router.get('/:userId',protect,getAllUserExpenses).post('/:userId',protect,createExpense)

module.exports = router