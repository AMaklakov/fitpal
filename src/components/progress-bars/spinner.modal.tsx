import React, { FC, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { StoreModel } from '@redux/store';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { useDebounce } from '@util/hooks.util';

interface IState {
	isLoading: boolean;
}

interface IProps {}

const SpinnerComponent: FC<IProps & IState> = props => {
	const { isLoading } = props;

	const [showModal, setShowModal] = useState();
	const isLoadingDebounced = useDebounce(isLoading, 500);

	useEffect(() => {
		setShowModal(isLoadingDebounced);
	}, [isLoadingDebounced]);

	return (
		<Modal isVisible={showModal} backdropOpacity={0.4} animationIn="flash" animationOut="flash">
			<View style={styles.modal}>
				<View style={styles.spinnerWrapper}>
					<ActivityIndicator size="large" style={styles.spinner} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinnerWrapper: {
		backgroundColor: Colors.White,
		width: 80,
		height: 80,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinner: {
		paddingLeft: 4,
		paddingTop: 4,
	},
});

const mapStateToProps = (state: StoreModel): IState => ({
	isLoading: isStateLoading(state),
});

export const SpinnerModal = connect(mapStateToProps)(SpinnerComponent);

const isStateLoading = (state: StoreModel): boolean => {
	const {
		exercise,
		user: { weightData, auth },
		training,
		covid,
	} = state;

	return [exercise, weightData, auth, training, covid].some(s => s.loading);
};
