import { RowModel } from '../exercise/types';

export interface ExerciseTablePropsModel {
	rowList: RowModel[];
	setRowList: (list: RowModel[]) => void;

	date?: string;
	canEdit: boolean;
}
