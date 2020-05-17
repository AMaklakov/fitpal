import moment, { MomentInput } from 'moment';
import 'moment/locale/ru';
import store from '@redux/store';

/**
 * @deprecated use `DateFormatEnum.Default` instead
 */
export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export enum DateFormatEnum {
	Default = 'DD.MM.YYYY',
	Calendar = 'YYYY-MM-DD',
	DD_MMM = 'DD MMM',
	DayOfWeek = 'dd',
}

export const getCurrentDate = (format: string = DateFormatEnum.Default): string => {
	return moment().format(format);
};

export const getToday = () => moment();

export const formatDate = (date: MomentInput, format: string = DateFormatEnum.Calendar): string => {
	const locale = store.getState().settings.language;
	moment.locale(locale);
	return moment(date).format(format);
};

export const convertStringToMoment = (dateStr: MomentInput, format: DateFormatEnum = DateFormatEnum.Default) => {
	return moment(dateStr, format);
};

export const diffInDays = (dateOne: moment.MomentInput, dateTwo: moment.MomentInput): number => {
	return moment(dateOne).diff(dateTwo, 'days');
};

export const toIsoString = (date: MomentInput): string => moment(date).toISOString();
