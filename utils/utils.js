const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();

const response = async (req, res, status = 500, code = null, message = null, data = null) => {
    res.status(status).json({
        status,
        code,
        message,
        results: data,
    });
}

const get_API_Url = async (api, route, lang = 'pt', page = 1) => {
    // GET Image
    // https://image.tmdb.org/t/p/original/
    var url = null;
    if (api === 'moviesDB') url = `https://api.themoviedb.org/3${route}?api_key=${process.env.MOVIES_DB_KEY}&language=${lang}&page=${page}`;
    else if (api === 'omdb') url = `http://www.omdbapi.com/?${route}&apikey=${process.env.OMDB_KEY}`;

    return url;
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, false );            
        anHttpRequest.send( null );
    }
}

module.exports = { response, get_API_Url, HttpClient };