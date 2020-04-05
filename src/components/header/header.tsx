import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuIcon } from '@icons/menu.icon';
import { Colors } from '@css/colors.style';
import { StoreModel } from '@redux/store';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';

interface IDispatch {}

interface IState {}

interface IProps {
	onOpenMenu: () => void;
}

const Component = (props: IProps & IState & IDispatch) => {
	const { onOpenMenu } = props;

	return (
		<View style={styles.wrapper}>
			<MenuIcon activeOpacity={0.7} touchableStyle={styles.menuIconHolder} onPress={onOpenMenu} />
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

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = (state, ownProps) => {
	return {};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = (dispatch, ownProps) => {
	return {};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component);
