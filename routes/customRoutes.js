const router = require('express').Router();
const getResponsesFromAiModels = require('../AiModelHandler/AiModelResponseHelpers');
const Route = require('../models/Route'); // Make sure the path to your Route model is correct

router.get('/*', async (req, res) => {
    try {
        console.log("resolving custom route")
        // Extract the endpoint from the request URL
        const baseUrl = '/api/custom-route';
        const endpoint = req.originalUrl.replace(baseUrl, '');

        // Extract the user query from the request body
        const { queryMessage } = req.body;

        if (!queryMessage) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing queryMessage in request body',
            });
        }

        // Find the route in the database
        const route = await Route.findOne({ endpoint: endpoint.trim() }).populate('knowledgePoolId');
        

        if (route) {
            // Fetch responses from AI models based on the user query
            const response = await getResponsesFromAiModels(route.aiModels, queryMessage, route.knowledgePoolId.data);

            // Return AI model names and their responses in the data object
            res.status(200).json({
                status: 'success',
                data: response,
            });
        } else {
            // If no such route exists, return 404
            res.status(404).json({
                status: 'error',
                message: 'Route not found',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
module.exports = router;
