/* eslint @typescript-eslint/camelcase: ["error", {allow: ['media_url']}] */

import React from 'react';
import { Box, Text, Image, Link, VisuallyHidden } from 'tamia';
import { YearHeading } from '../components/YearHeading';
import Base from './Base';

interface Photo {
	timestamp: string;
	caption: string;
	media_url: string;
	permalink: string;
	id: string;
}

interface Day {
	date: string;
	photos: Photo[];
}

type Props = {
	pageContext: {
		days: [Day, Day, Day];
	};
};

const HEADINGS = ['Today', 'Yesterday', 'Day before yesterday'];

function getYear(date: string) {
	const [year] = date.split('-');
	return year;
}

function getFirstPhoto(days: [Day, Day, Day]) {
	const dayWithPhotos = days.find((day) => day.photos.length > 0);
	if (!dayWithPhotos) {
		return undefined;
	}
	return dayWithPhotos.photos[0].media_url;
}

export default function Index({ pageContext: { days } }: Props) {
	return (
		<Base image={getFirstPhoto(days)}>
			<main>
				<VisuallyHidden as="h1">
					My Instagram photos made on this day
				</VisuallyHidden>
				{days.map((day, index) => (
					<Box key={day.date} mx={['-m', 0]} mb="xl">
						<YearHeading level={2} mb="m">
							{HEADINGS[index]}
						</YearHeading>
						{day.photos.length > 0 ? (
							day.photos.map(({ media_url, permalink, caption, timestamp }) => (
								<Box key={permalink} mb="m" position="relative">
									<Link href={permalink}>
										<Image src={media_url} alt={caption} expand={false} />
										<Box position="absolute" top={0} right={0}>
											<Text variant="verticalLabel">{getYear(timestamp)}</Text>
										</Box>
									</Link>
								</Box>
							))
						) : (
							<Text mx={['m', 0]} variant="small">
								No photos from this day
							</Text>
						)}
					</Box>
				))}
				<Text variant="large" textAlign="center" mb="xl">
					<Link href="https://www.instagram.com/sapegin/">
						Follow me on Instagram!
					</Link>
				</Text>
			</main>
			<Text as="footer" variant="small">
				<span aria-hidden="true">🦠</span> Made at home in Berlin during the
				Coronavirus by <Link href="https://sapegin.me/">Artem Sapegin</Link>,{' '}
				<Link href="https://github.com/sapegin/every.morning.photos">
					source code
				</Link>
			</Text>
		</Base>
	);
}
