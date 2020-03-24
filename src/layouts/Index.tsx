import React from 'react';
import styled from 'styled-components';
import { Box, Text, Link, VisuallyHidden } from 'tamia';
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

const Image = styled.img`
	max-width: 100%;
	height: auto;
`;

function getYear(date: string) {
	const [year] = date.split('-');
	return year;
}

export default function Index({ pageContext: { days } }: Props) {
	return (
		<Base>
			<main>
				<VisuallyHidden as="h1">
					My Instagram photos made on this day
				</VisuallyHidden>
				{days.map((day, index) => (
					<Box key={day.date} mb="xl">
						<YearHeading level={2} mb="m">
							{HEADINGS[index]}
						</YearHeading>
						{day.photos.length > 0 ? (
							day.photos.map(({ media_url, permalink, caption, timestamp }) => (
								<Box mb="m" position="relative">
									<Link href={permalink}>
										<Image src={media_url} alt={caption} />
										<Box position="absolute" top={0} right={0}>
											<Text variant="label">{getYear(timestamp)}</Text>
										</Box>
									</Link>
								</Box>
							))
						) : (
							<Text variant="small">No photos from this day</Text>
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
				Coronavirus by <Link href="https://sapegin.me/">Artem Sapegin</Link>
			</Text>
		</Base>
	);
}
