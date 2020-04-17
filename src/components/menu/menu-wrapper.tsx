import React, { FC } from 'react';
import { NativeModules, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { toRgba } from '@util/css.util';

export interface IMenuWrapperProps {
	isOpen: boolean;
	onCloseMenu: () => void;

	menuWidth?: string | number;
}

export const MenuWrapper: FC<IMenuWrapperProps> = props => {
	const { isOpen, onCloseMenu, menuWidth = '66%', children } = props;

	if (!isOpen) {
		return null;
	}

	return (
		<View style={styles.wrapper}>
			<View style={StyleSheet.flatten([styles.menuWrapper, { width: menuWidth }])}>{children}</View>

			<TouchableOpacity activeOpacity={0.95} style={styles.backdrop} onPress={onCloseMenu} />
		</View>
	);
};

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: STATUS_BAR_HEIGHT,
		left: 0,
		flexDirection: 'row',
	},
	menuWrapper: {
		backgroundColor: Colors.White,
	},
	backdrop: {
		backgroundColor: toRgba(Colors.Black, 0.8),
		flex: 1,
	},
});
