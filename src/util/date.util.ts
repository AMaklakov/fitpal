import moment from 'moment';

export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export const getCurrentDate = (format: string = DEFAULT_DATE_FORMAT): string => {
	return moment().format(format);
};
