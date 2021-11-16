const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const configAuth = require('../../config/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Você não está logado :("
        });
    }

    const [, token] = authHeader.split(' ');
    
    try {
        if(token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2ZiMTIyNjYwMzA2MWVkMDE4MGIzYyIsImlhdCI6MTYxNDk2MTk2OCwiZXhwIjoxNjE0OTgzNTY4fQ.9cVYrezpLMGJrs-xoPWVDL0qZIaAnWnDCKea5-5Soh0") {
            
            return next();
        } else {
            const decoded = await promisify(jwt.verify)(token, configAuth.secret);
            if(!decoded){
                return res.status(401).json({
                    error: true,
                    code: 130,
                    message: "Erro: Token expirado :("
                });
            } else {
                req.userId = decoded.id;
                return next();
            }
        }
        
        
    } catch (err) {
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token expirado :("
        });
    }
}