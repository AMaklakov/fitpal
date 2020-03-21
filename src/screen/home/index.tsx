import React from 'react';
import { Button, View } from 'react-native';
import { Routes } from '../navigator';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import { useTranslation } from 'react-i18next';

const HomeScreen = (props: NavigationPropsModel) => {
	const { t } = useTranslation();
	const goToPage = (page: Routes) => () => props.navigation.navigate(page);

	return (
		<View>
			<Button title={t('Show calendar')} onPress={goToPage(Routes.Calendar)} />
			<Button title={t('Exercise list')} onPress={goToPage(Routes.ExerciseList)} />
		</View>
	);
};

export default HomeScreen;
