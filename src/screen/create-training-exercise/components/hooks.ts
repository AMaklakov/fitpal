import { useEffect } from 'react';
import { addEmptySeries } from '@screen/create-training-exercise/helpers';
import { IBaseTrainingExercise } from '@model/training-exercise';

export const useAddFirstSet = (ex: IBaseTrainingExercise, onChange: (exercise: IBaseTrainingExercise) => void) => {
	useEffect(() => {
		if (!ex.seriesList.length) {
			onChange(addEmptySeries(ex));
		}
	}, [ex, onChange]);
};
