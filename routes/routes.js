module.exports = (ProtectedRoute,app) => {
	require('./user')(ProtectedRoute,app);
}