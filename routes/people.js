const express = require('express');
const { response, get_API_Url, HttpClient } = require('../utils/utils.js');

const moviesFunc = () => {
    const router = express.Router();

    return router
        .get('/:id', async (req, res, next) => {
            const { id } = req.params;

            const url1 = await get_API_Url('moviesDB', `/person/${id}`)
            const url2 = await get_API_Url('moviesDB', `/person/${id}/combined_credits`)

            var client = new HttpClient();
            await client.get(url1, async function(api_response1) {
                await client.get(url2, function(api_response2) {
                    const finalRes = {
                        ...JSON.parse(api_response1),
                        ...JSON.parse(api_response2),
                    }

                    response(req, res, 200, 'PERSON_FOUND', 'Person found', finalRes);
                });
            });
        })
}

module.exports = moviesFunc;