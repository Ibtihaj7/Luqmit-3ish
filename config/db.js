let databaseConnection = mysql.createConnection({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
   
})
databaseConnection.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('connected');
    }
})
if (myenv.error) {
    console.log("Error while connecting the database")
    throw myenv.error
}

module.exports=databaseConnection;

