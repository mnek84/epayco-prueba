import mysql from "mysql";

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

exports.execute = ( sql, args ) => {

    return new Promise( ( resolve, reject ) => {
        const query = connection.query( sql, args, ( err, rows ) => {
            if ( err ){
                return reject( err );
            }
            //connection.release();
            resolve( rows );
        });
    });
}

export default connection;
