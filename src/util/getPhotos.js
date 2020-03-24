// @ts-check
const get = require('bent')('json');
const { add } = require('date-fns');

require('dotenv').config();

const MAX_PAGES = 30;

/**
 * @param {Date} date
 */
function toISODate(date) {
	return date.toISOString().slice(0, 10);
}

/**
 * @param {string} date
 */
function parseISODate(date) {
	const [year, month, day] = date.split('-');
	return { year, month, day };
}

function getFirstPageUrl() {
	const url = new URL('https://graph.instagram.com/me');
	url.searchParams.append('access_token', process.env.INSTAGRAM_ACCESS_TOKEN);
	url.searchParams.append(
		'fields',
		[
			'media.timestamp',
			'media.caption',
			'media.media_url',
			'media.permalink',
		].join(',')
	);
	return url.href;
}

/**
 * @param {string} url
 */
async function fetchPhotos(url) {
	try {
		const response = await get(url);
		const {
			data,
			paging: { next },
		} = response.media || response;
		return { photos: data, next };
	} catch (err) {
		console.error('Cannot fetch photos from Instagram:', err.toString());
		process.exit(1);
		return undefined;
	}
}

async function fetchAllPhotos() {
	const allPhotos = [];
	let pagesLeft = MAX_PAGES;
	let url = getFirstPageUrl();

	for (;;) {
		console.log(`Fetching photos ${MAX_PAGES - pagesLeft + 1}...`, url);
		// eslint-disable-next-line no-await-in-loop
		const { photos, next } = await fetchPhotos(url);

		allPhotos.push(...photos);
		url = next;

		pagesLeft--;
		if (pagesLeft === 0 || !next) {
			break;
		}
	}

	console.log('All photos:', allPhotos.length);

	return allPhotos;
}

/**
 * @param {any[]} photos
 * @param {string} date YYYY-MM-DD
 */
function getPhotosForDate(photos, date) {
	const { year: dateYear, month: dateMonth, day: dateDay } = parseISODate(date);
	return photos.filter(({ timestamp }) => {
		const { year, month, day } = parseISODate(timestamp.slice(0, 10));
		return month === dateMonth && day === dateDay && year !== dateYear;
	});
}

module.exports = async function getPhotos() {
	// return require('../../data.json');
	const allPhotos = await fetchAllPhotos();
	const now = new Date();
	const dates = [now, add(now, { days: -1 }), add(now, { days: -2 })].map(
		toISODate
	);
	return dates.map((date) => ({
		date,
		photos: getPhotosForDate(allPhotos, date),
	}));
};

// (async function () {
// 	const photos = await module.exports();
// 	console.log(photos);
// 	require('fs').writeFileSync('data.json', JSON.stringify(photos, null, '  '));
// })();
