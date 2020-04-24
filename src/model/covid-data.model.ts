import moment from 'moment';

export interface ICovidData {
	date: moment.Moment;
	confirmed: number;
	deaths: number;
	recovered: number;
}
