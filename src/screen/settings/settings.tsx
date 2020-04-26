import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '@redux/store';
import { changeLanguage, Languages } from '../../i18n';
import { updateLanguageAction } from '@redux/action/settings.action';
import { Language } from '@screen/settings/components/language';
import { Weight } from '@screen/settings/components/weight';
import { setWeightModalVisible } from '@redux/action/user.action';

interface IDispatch {
	onUpdateLanguage: (language: Languages) => void;
	onOpenWeightModal: () => void;
}

interface IState {
	currentLanguage: Languages;
}

interface IProps {}

const Settings = (props: IProps & IState & IDispatch) => {
	const { currentLanguage, onUpdateLanguage, onOpenWeightModal } = props;

	const handleChangeLanguage = async (language: Languages | null) => {
		const newLanguage = language ?? currentLanguage;

		changeLanguage(newLanguage);
		onUpdateLanguage(newLanguage);
	};

	return (
		<View style={styles.wrapper}>
			<ScrollView>
				<Language lang={currentLanguage} onChange={handleChangeLanguage} />
				<Weight onOpenModal={onOpenWeightModal} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		currentLanguage: state.settings.language,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		onUpdateLanguage: (language: Languages) => dispatch(updateLanguageAction(language)),
		onOpenWeightModal: () => dispatch(setWeightModalVisible(true)),
	};
};

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(Settings);
