const baseFont = ['Helvetica', 'sans-serif'].join(',');
const space = {
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
};
const breakpoints = [
	'32rem', // 512px
	'48rem', // 768px
	'64rem', // 1024px
];
const fonts = {
	base: baseFont,
	heading: baseFont,
};
const fontSizes = {
	l: '2rem',
	m: '1rem', // 16px
	s: '0.875rem', // 14px
};
const colors = {
	bg: '#fff',
	base: '#222',
	light: '#ccc',
	primary: '#222',
	hover: '#de3a1e',
	selection: 'rgb(255,237,117)',
	selectionAlpha: 'rgba(255,237,117,0.25)',
};
const fontWeights = {
	base: 300,
	heading: 400,
};
const lineHeights = {
	base: 1.5,
	heading: 1,
};
const letterSpacings = {
	base: 0,
	heading: '0.2ex',
};
const headingBaseStyles = {
	color: colors.base,
	fontFamily: fonts.heading,
	fontWeight: fontWeights.heading,
	lineHeight: lineHeights.heading,
	letterSpacing: letterSpacings.heading,
};
const textBaseStyles = {
	color: colors.base,
	fontFamily: fonts.base,
	fontWeight: fontWeights.base,
	lineHeight: lineHeights.base,
	letterSpacing: letterSpacings.base,
};

export default {
	baseFontSize: '1em',
	page: {
		maxWidth: '64rem',
		xPadding: space.m,
		yPadding: space.m,
	},
	fonts,
	space,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	colors,
	breakpoints,
	headingStyles: {
		2: {
			...headingBaseStyles,
			fontSize: fontSizes.m,
			textTransform: 'uppercase',
		},
	},
	textStyles: {
		custom: {},
		base: {
			...textBaseStyles,
			fontSize: fontSizes.m,
		},
		small: {
			...textBaseStyles,
			fontSize: fontSizes.s,
		},
		large: {
			...textBaseStyles,
			fontSize: fontSizes.l,
		},
	},
} as const;
