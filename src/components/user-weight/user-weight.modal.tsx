import React, { FC, useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IntegerNumberInputWithValidation } from '@inputs/integer-number-input/integer-number-input';
import { Big, BigSource } from 'big.js';
import { connect } from 'react-redux';
import { StoreModel } from '@redux/store';
import { Dispatch } from 'redux';
import { changeUserWeightSuccess, setWeightModalVisible } from '@redux/action/user.action';
import moment from 'moment';
import { Colors } from '@css/colors.style';
import { IErrors } from '@components/with-validation/with-validation';
import { USER_MAX_WEIGHT, USER_MIN_WEIGHT } from '@const/validation-const';
import { Button } from '@components/button/button';
import { H2 } from '@components/heading/h2';

interface IState {
	userWeight: BigSource;
	isVisible: boolean;
}

interface IDispatch {
	onSave: (userWeight: BigSource) => void;
	// onCancel: (userWeight: BigSource) => void;
}

interface IProps {}

const UserWeightModalComponent: FC<IProps & IState & IDispatch> = props => {
	const { userWeight, onSave, isVisible } = props;
	const { t } = useTranslation();

	const [disabledSave, setDisabledSave] = useState(false);
	const [weight, setWeight] = useState(Big(userWeight).toString());
	useEffect(() => {
		setWeight(Big(userWeight).toString());
	}, [userWeight]);

	const handleSetWeight = useCallback((weight: string, errors?: IErrors) => {
		setDisabledSave(!!errors);
		setWeight(weight);
	}, []);

	const handleSave = useCallback(() => {
		if (disabledSave) {
			return;
		}
		onSave(weight);
	}, [disabledSave, onSave, weight]);

	return (
		<Modal isVisible={isVisible}>
			<View style={styles.wrapper}>
				<H2 text={t('Enter your weight')} />
				<IntegerNumberInputWithValidation
					onChange={handleSetWeight}
					value={weight}
					min={[USER_MIN_WEIGHT, t('Min value is |min|', { min: USER_MIN_WEIGHT })]}
					max={[USER_MAX_WEIGHT, t('Max value is |max|', { max: USER_MAX_WEIGHT })]}
				/>

				<View style={styles.bottomActionWrapper}>
					{/*<TouchableOpacity onPress={onCancel} style={styles.buttonWithIconWrapper}>*/}
					{/*	<CancelIcon color={Colors.Red} />*/}
					{/*	<Text style={styles.cancelButton}>{t('Cancel')}</Text>*/}
					{/*</TouchableOpacity>*/}

					<Button disabled={disabledSave} onPress={handleSave} title={t('Save')} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 20,
		backgroundColor: Colors.White,
		borderRadius: 10,
	},
	bottomActionWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 10,
	},
	cancelButton: {
		paddingLeft: 10,
		color: Colors.LightRed,
	},
});

const mapStateToProps = (state: StoreModel): IState => ({
	userWeight: state.user.weightData.weight,
	isVisible: state.user.weightData.isModalVisible,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onSave: (userWeight: BigSource) => {
		dispatch(
			changeUserWeightSuccess({
				date: moment(),
				weight: userWeight,
			})
		);
		dispatch(setWeightModalVisible(false));
	},
});

export const UserWeightModal = connect(mapStateToProps, mapDispatchToProps)(UserWeightModalComponent);
