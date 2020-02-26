import moment from 'moment';

export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';
export const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD';

export const getCurrentDate = (format: string = DEFAULT_DATE_FORMAT): string => {
	return moment().format(format);
};

export const getToday = () => moment();

export const formatDate = (
	date: moment.MomentInput,
	format: string = CALENDAR_DATE_FORMAT
): string => {
	return moment(date).format(format);
};
