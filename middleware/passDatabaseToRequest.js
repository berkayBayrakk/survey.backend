function passDatabaseToRequest(database) {
    return function(req, res,next) {
      req.database=database;
      next();
    };
}

module.exports=passDatabaseToRequest;