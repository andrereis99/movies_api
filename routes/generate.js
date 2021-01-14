const express = require('express');
const moment = require('moment');
const errors = require('../utils/errors.js');
const { response } = require('../utils/utils.js');
const PptxGenJS = require("pptxgenjs");

const generateFunc = () => {
    const router = express.Router();

    return router
        .post('/movies/ppt', async (req, res, next) => {
            const { movies } = req.body;
            console.log('Entrou')

            if (!movies || !movies.length) throw errors.invalid_list;

            const pptx = new PptxGenJS();

            for(const movie of movies) {
                var slide = pptx.addSlide();
                
                slide.addText(
                    movie.Title || movie.title || movie.original_title || movie.name || movie.original_name,
                    { x:0.25, y:0.25, w:'100%', h:1.5, fontSize:24, color:'0088CC' }
                );

                {movie.Director && slide.addText(
                   movie.Director,
                   { x:0.25, y:1.5, w:'100%', h:0.5, fontSize:14, color:'878787' }
                )}

                slide.addText(
                   movie.release_date || movie.first_air_date,
                   { x:1.25, y:1.5, w:'100%', h:0.5, fontSize:14, color:'878787' }
                )

                slide.addText(
                    movie.overview,
                    { x:0.0, y:2.45, w:'100%', h:3.1, align:'center', justifyContent:'start' , fontSize:16, color:'878787' }
                )

                const poster = movie.poster_path || movie.backdrop_path

                {poster && slide.addImage({ path:`https://image.tmdb.org/t/p/original/${poster}`, x:7.5, y:0.25, w:1.6, h:2.2 })}
            }



            pptx.writeFile(moment.utc()).then(function(fileName){
                console.log('Saved! File Name: '+fileName)
                response(req, res, 200, 'PPT_GENERATED', 'Power Point Generated', fileName);
            });
        })
        .get('/clear/ppt', async (req, res, next) => {
            
        })
}

module.exports = generateFunc;