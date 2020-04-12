import React from 'react';
import renderer from 'react-test-renderer';
import { TrainingMinimalView } from '@components/training-minimal-view/training-minimal-view';
import { TrainingModel } from '@model/training.model';

describe('TrainingMinimalView', () => {
	it('should render properly', () => {
		const training: TrainingModel = {
			name: 'Long name of exercise that causes showing ellipsis',
			exerciseList: [],
			date: '01.01.1999',
			id: '1',
		};

		const tree = renderer.create(<TrainingMinimalView training={training} onTrainingPress={() => {}} />);
		expect(tree).toMatchSnapshot();
	});
});
