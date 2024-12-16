const Router = require('restify-router').Router;
const router = new Router();
const PaymentCard = require('../models/payment_card');

router.get('/paymentcard/customer/:id', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const result = await PaymentCard.getCustomerCards(customerId);
        res.send(200, { success: true, data: result.data });
    } catch (error) {
        res.send(500, { success: false, message: error.message });
    }
});

router.post('/paymentcard/customer/:id', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const result = await PaymentCard.addCustomerCard(customerId, req.body);
        res.send(201, { success: true, data: result.data });
    } catch (error) {
        res.send(500, { success: false, message: error.message });
    }
});

router.patch('/paymentcard/customer/:id/:cardId', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const cardId = parseInt(req.params.cardId);
        const result = await PaymentCard.updateCustomerCard(customerId, cardId, req.body);
        res.send(200, { success: true, data: result.data });
    } catch (error) {
        res.send(500, { success: false, message: error.message });
    }
});

router.del('/paymentcard/customer/:id/:cardId', async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const cardId = parseInt(req.params.cardId);
        await PaymentCard.deleteCustomerCard(customerId, cardId);
        res.send(204);
    } catch (error) {
        res.send(500, { success: false, message: error.message });
    }
});

module.exports = router;
