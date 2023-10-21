const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')

// recup les transaction du compte 

router.get(
    '/transaction',
    tokenValidation.validateToken,
    userController.getAccountTransaction

)

// creer une transaction

router.post(
    '/transaction',
    tokenValidation.validateToken,
    userController.createTransaction
)

// recuperer une transaction en particulier 

router.get(
    '/transaction/:id',
    tokenValidation.validateToken,
    userController.getTransactionById
)

// mettre a jours les information d'une transaction

router.put(
    '/transaction/:id',
    tokenValidation.validateToken,
    userController.updateTransactionInfos
)


module.exports = router;