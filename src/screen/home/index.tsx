import React from 'react';
import { Button, View } from 'react-native';
import { Routes } from '../navigator';
import { NavigationPropsModel } from '../../model/navigation-props.model';

const HomeScreen = (props: NavigationPropsModel) => {
	const goToPage = (page: Routes) => () => props.navigation.navigate(page);

	return (
		<View>
			<Button title={'Записать тренировку'} onPress={goToPage(Routes.Calendar)} />
			<Button title={'Список упражнений'} onPress={goToPage(Routes.ExerciseList)} />
		</View>
	);
};

export default HomeScreen;
