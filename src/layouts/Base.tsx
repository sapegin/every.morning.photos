import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Page } from 'tamia';
import Provider from './Provider';
import theme from '../theme';

interface BaseProps {
	image?: string;
	children: React.ReactNode;
}

export default function Base({ image, children }: BaseProps) {
	return (
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							lang
							title
							description
							url
							twitter
						}
					}
				}
			`}
			render={({
				site: {
					siteMetadata: { lang, title, description, url, twitter },
				},
			}) => (
				<>
					<Helmet title={title}>
						<html lang={lang} />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, shrink-to-fit=no"
						/>
						<meta name="theme-color" content={theme.colors.primary} />
						<meta name="description" content={description} />
						<meta property="og:type" content="website" />
						<meta property="og:title" content={title} />
						<meta property="og:site_name" content={title} />
						<meta property="og:url" content={url} />
						<meta property="og:description" content={description} />
						<meta name="twitter:creator" content={twitter} />
						{image && <meta property="og:image" content={image} />}
						{image && (
							<meta name="twitter:card" content="summary_large_image" />
						)}
						{image && <meta name="twitter:image" content={image} />}
						<meta name="twitter:site" content="@iamsapegin" />
						<link rel="apple-touch-icon" href="/icon.png" />
						<meta name="apple-mobile-web-app-capable" content="yes" />
					</Helmet>
					<Provider>
						<Page>{children}</Page>
					</Provider>
				</>
			)}
		/>
	);
}
