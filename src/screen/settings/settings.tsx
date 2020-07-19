import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { IStore } from '@redux/store';
import { changeLanguage, Languages } from '../../i18n';
import { updateLanguageAction } from '@redux/action/settings.action';
import { Language } from '@screen/settings/components/language';
import { Weight } from '@screen/settings/components/weight';
import { setWeightModalVisible } from '@redux/action/user.action';
import { Divider } from 'react-native-elements';
import { getUserWeight } from '@redux/selector/user.selector';
import { BigSource } from 'big.js';

interface IDispatch {
	onUpdateLanguage: (language: Languages) => void;
	onOpenWeightModal: () => void;
}

interface IState {
	currentLanguage: Languages;
	weight: BigSource;
}

interface IProps {}

const Settings = (props: IProps & IState & IDispatch) => {
	const { currentLanguage, onUpdateLanguage, onOpenWeightModal, weight } = props;

	const handleChangeLanguage = useCallback(
		(language: Languages | null) => {
			const newLanguage = language ?? currentLanguage;

			changeLanguage(newLanguage);
			onUpdateLanguage(newLanguage);
		},
		[currentLanguage, onUpdateLanguage]
	);

	return (
		<View style={styles.wrapper}>
			<ScrollView>
				<Language lang={currentLanguage} onChange={handleChangeLanguage} />
				<Divider style={styles.divider} />

				<Weight weight={weight} onOpenModal={onOpenWeightModal} />
				<Divider style={styles.divider} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 20,
		flex: 1,
	},
	divider: {
		height: 1,
		marginVertical: 15,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, IStore> = state => {
	return {
		currentLanguage: state.settings.language,
		weight: getUserWeight(state),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		onUpdateLanguage: (language: Languages) => dispatch(updateLanguageAction(language)),
		onOpenWeightModal: () => dispatch(setWeightModalVisible(true)),
	};
};

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(Settings);
