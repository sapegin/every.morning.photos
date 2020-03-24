import React from 'react';
import styled from 'styled-components';
import { Box, Text, Heading, Link, VisuallyHidden } from 'tamia';
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

const YearHeading = styled(Heading)`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	white-space: nowrap;
	&:before,
	&:after {
		content: '';
		border-top: 1px solid ${(props) => props.theme.colors.light};
		flex-grow: 1;
	}
	&:before {
		margin-right: 0.4em;
	}
	&:after {
		margin-left: 0.4em;
	}
`;

const Image = styled.img`
	max-width: 100%;
	height: auto;
`;

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
							day.photos.map(({ media_url, permalink, caption }) => (
								<Box mb="m">
									<Link href={permalink}>
										<Image src={media_url} alt={caption} />
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
