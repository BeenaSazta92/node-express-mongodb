module.exports = (ProtectedRoute,app) => {
	require('./user')(app);
}