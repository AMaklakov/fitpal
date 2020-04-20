import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuIcon } from '@icons/menu.icon';
import { Colors } from '@css/colors.style';
import { StoreModel } from '@redux/store';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { ButtonIcon } from '@components/button-icon/button-icon';

interface IDispatch {}

interface IState {}

interface IProps {
	onOpenMenu: () => void;
}

const Component = (props: IProps & IState & IDispatch) => {
	const { onOpenMenu } = props;

	return (
		<View style={styles.wrapper}>
			<ButtonIcon icon={<MenuIcon />} activeOpacity={0.7} style={styles.menuIconHolder} onPress={onOpenMenu} />
		</View>
	);
};

const HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
	wrapper: {
		height: HEADER_HEIGHT,
		backgroundColor: Colors.White,
	},
	menuIconHolder: {
		width: HEADER_HEIGHT,
		height: HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = () => {
	return {};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = () => {
	return {};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component);
