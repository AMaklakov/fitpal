import moment, { MomentInput } from 'moment';

/**
 * @deprecated use `DateFormatEnum.Default` instead
 */
export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export enum DateFormatEnum {
	Default = 'DD.MM.YYYY',
	Calendar = 'YYYY-MM-DD',
}

export const getCurrentDate = (format: string = DateFormatEnum.Default): string => {
	return moment().format(format);
};

export const getToday = () => moment();

export const formatDate = (date: MomentInput, format: string = DateFormatEnum.Calendar): string => {
	return moment(date).format(format);
};

export const convertStringToMoment = (dateStr: MomentInput, format: DateFormatEnum = DateFormatEnum.Default) => {
	return moment(dateStr, format);
};
