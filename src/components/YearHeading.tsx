import styled from 'styled-components';
import { Heading } from 'tamia';

export const YearHeading = styled(Heading)`
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
