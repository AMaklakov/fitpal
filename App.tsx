import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RowModel } from './src/components/exercise-table/row/types';
import { ExerciseTable } from './src/components/exercise-table/exercise-table';

const rowList: RowModel[] = [
	{
		exercise: {
			name: 'hello',
			series: [
				{ repeats: 10, sequenceNumber: 1, weight: 50 },
				{ repeats: 12, sequenceNumber: 2, weight: 50 },
				{ repeats: 8, sequenceNumber: 3, weight: 55 },
			],
		},
	},
	{
		exercise: {
			name: 'hello1',
			series: [
				{ repeats: 10, sequenceNumber: 1, weight: 50 },
				{ repeats: 12, sequenceNumber: 2, weight: 50 },
				{ repeats: 8, sequenceNumber: 3, weight: 55 },
			],
		},
	},
];

const App = () => (
	<>
		<StatusBar barStyle="dark-content" />

		<SafeAreaView>
			<ExerciseTable rowList={rowList} canEdit={true} />
		</SafeAreaView>
	</>
);

export default App;
