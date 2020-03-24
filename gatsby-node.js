const path = require('path');
const getPhotos = require('./src/util/getPhotos');

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.createPages = async ({ actions: { createPage } }) => {
	const days = await getPhotos();
	createPage({
		path: '/',
		component: path.resolve(`${__dirname}/src/layouts/Index.tsx`),
		context: { days },
	});
};
