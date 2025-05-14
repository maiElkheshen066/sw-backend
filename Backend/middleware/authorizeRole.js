// pass expected role and check if user has that role in request
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ status: 'fail', message: 'Access denied' });
        }
        next();
    };
};

module.exports = authorizeRole;
