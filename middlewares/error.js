const errorHandling = (err, req, res, next) => {
    if(err.status) {
        res.status(404).json({message: err.message})
    }
    res.status(500).json({message: err.message})
}

export default errorHandling;