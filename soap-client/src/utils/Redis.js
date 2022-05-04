import {createClient} from "redis";
import connection from "./database";

const redisClient = createClient(
    process.env.CACHE_PORT,
    process.env.CACHE_HOST
);

redisClient.on("error", function(error) {
    console.error(error);
});


export default redisClient;

exports.getCache = ( cacheKey ) => {

    return new Promise( ( resolve, reject ) => {
        redisClient.get(cacheKey, function(err, result) {
            if ( err )
                return reject( err );
            resolve( JSON.parse(result) );
        });
    });
}

exports.setCache = ( cacheKey , response ) => {
    redisClient.setex(cacheKey,process.env.CACHE_DURATION, JSON.stringify(response));
}
