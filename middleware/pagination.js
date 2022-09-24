const pagination = (model)=>{
    return (req,res,next)=>{
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)

        const start=(page-1)*limit 
        const end=page*limit 

        const results={}

        results.data=model.splice(start,end);

        res.paginatedResult = results;

        next()
    }
}

module.exports = pagination