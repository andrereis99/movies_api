const express = require('express');
const { response, get_API_Url, HttpClient } = require('../utils/utils.js');

const moviesFunc = () => {
    const router = express.Router();

    return router
        .get('/sorted/:sorter/:page?/:lang?', async (req, res, next) => {
            const { sorter, page, lang } = req.params;

            const url = await get_API_Url('moviesDB', `/movie/${sorter}`, lang, page)
            console.log('url', url)

            var client = new HttpClient();
            await client.get(url, function(api_response) {
                console.log('response', api_response)
                response(req, res, 200, 'MOVIES_FOUND', 'Movies found', JSON.parse(api_response));
            });
        })
        .get('/:id/:lang?', async (req, res, next) => {
            const { id, lang } = req.params;

            const url1 = await get_API_Url('moviesDB', `/movie/${id}`, lang)
            const url2 = await get_API_Url('moviesDB', `/movie/${id}/credits`, lang)
            const extraIdsUrl = await get_API_Url('moviesDB', `/movie/${id}/external_ids`, lang)
            
            console.log('url1', url1)
            console.log('url2', url2)

            var client = new HttpClient();
            await client.get(url1, async function(api_response1) {
                await client.get(url2, async function(api_response2) {
                    var extraIds = {};

                    console.log('extraIdsUrl', extraIdsUrl)

                    await client.get(extraIdsUrl, async function(extraIds_response) {
                        extraIds = extraIds_response;
                    });

                    const url3 = await get_API_Url('omdb', `i=${JSON.parse(extraIds).imdb_id}`, lang)

                    console.log('url3', url3)

                    await client.get(url3, async function(api_response3) {

                        const finalRes = {
                            ...JSON.parse(api_response3),
                            ...JSON.parse(api_response1),
                            ...JSON.parse(api_response2),
                            ...JSON.parse(extraIds),
                        }
                        response(req, res, 200, 'MOVIE_FOUND', 'Movie found', finalRes);
                    });
                });
            });
        })
}

module.exports = moviesFunc;