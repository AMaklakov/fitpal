import { RowModel } from './row/types';

export interface ExerciseTablePropsModel {
	rowList: RowModel[];

	canEdit: boolean;
}
