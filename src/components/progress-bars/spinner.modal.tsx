import React, { FC, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { StoreModel } from '@redux/store';
import Spinner from 'react-native-spinkit';
import { StyleSheet, View } from 'react-native';
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
					<Spinner isVisible={true} size={50} type="Circle" />
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
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 10,
		paddingLeft: 7,
		paddingTop: 7,
	},
	spinner: {
		backgroundColor: 'red',
	},
});

const mapStateToProps = (state: StoreModel): IState => ({
	isLoading: Object.keys(state)
		.map(key => state[key] as { [k: string]: any })
		.some(s => !!s.loading),
});

export const SpinnerModal = connect(mapStateToProps)(SpinnerComponent);
