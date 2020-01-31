import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RowModel } from './src/components/exercise/types';
import { ExerciseTable } from './src/components/exercise-table/exercise-table';

const defRwList: RowModel[] = [];

const App = () => {
	const [rowList, setRowList] = useState(defRwList);

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView>
				<ExerciseTable rowList={rowList} setRowList={list => setRowList(list)} canEdit={true} />
			</SafeAreaView>
		</>
	);
};

export default App;
