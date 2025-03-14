export const protectAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}
export default protectAdmin;
    