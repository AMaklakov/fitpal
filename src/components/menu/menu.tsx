import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { IMenuWrapperProps, MenuWrapper } from '@components/menu/menu-wrapper';
import { Routes } from '@screen/navigator';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@icons/chevron-right.icon';
import { SettingsIcon } from '@icons/settings.icon';
import { Colors } from '@css/colors.style';
import { toRgba } from '@util/css.util';
import { DeadIcon } from '@icons/dead.icon';
import { connect } from 'react-redux';
import { StoreModel } from '@redux/store';
import { Dispatch } from 'redux';
import { COVID_ACTION_CREATORS } from '@redux/action/covid.action';
import { getCovidConfirmed } from '@redux/selector/covid.selector';
import { ListItem } from 'react-native-elements';
import { Fonts } from '@css/fonts';
import { ExitIcon } from '@icons/exit.icon';
import { logoutStart } from '@redux/action/user.action';

interface IState {
	covidConfirmed: string | number;
	isCovidLoading: boolean;
}

interface IDispatch {
	onFetchCovidConfirmed: () => void;
}

interface IProps extends IMenuWrapperProps {
	navigate: (route: Routes) => void;
	activeRoute: Routes;
}

interface IDispatch {
	onLogout: () => void;
}

export const MenuComponent = (props: IProps & IState & IDispatch) => {
	const {
		isOpen,
		onCloseMenu,
		navigate,
		activeRoute,
		onFetchCovidConfirmed,
		covidConfirmed,
		isCovidLoading,
		onLogout,
	} = props;
	const { t } = useTranslation();

	const goToPage = useCallback((page: Routes) => () => navigate(page), [navigate]);

	const handleLogout = useCallback(() => onLogout(), [onLogout]);

	useEffect(() => {
		if (isOpen && covidConfirmed === 0 && !isCovidLoading) {
			onFetchCovidConfirmed();
		}
	}, [covidConfirmed, isCovidLoading, isOpen, onFetchCovidConfirmed]);

	const topNavigationList = useMemo(
		() => [
			{
				name: t('Calendar'),
				icon: <ChevronRightIcon />,
				isActive: activeRoute === Routes.Calendar,
				onPress: goToPage(Routes.Calendar),
			},
			{
				name: t('Exercise list'),
				icon: <ChevronRightIcon />,
				isActive: activeRoute === Routes.ExerciseList,
				onPress: goToPage(Routes.ExerciseList),
			},
			{
				name: t('Statistics'),
				icon: <ChevronRightIcon />,
				isActive: activeRoute === Routes.Statistics,
				onPress: goToPage(Routes.Statistics),
			},
		],
		[activeRoute, goToPage, t]
	);

	const bottomNavigationList = useMemo(
		() => [
			{
				name: t('Covid |count|', { value: covidConfirmed }),
				description: t('Infected by the virus'),
				icon: <DeadIcon />,
			},
			{
				name: t('Settings'),
				icon: <SettingsIcon />,
				isActive: activeRoute === Routes.Settings,
				onPress: goToPage(Routes.Settings),
			},
			{
				name: t('Exit'),
				styles: { color: Colors.Red },
				icon: <ExitIcon />,
				onPress: handleLogout,
			},
		],
		[activeRoute, covidConfirmed, goToPage, t, handleLogout]
	);

	return (
		<MenuWrapper isOpen={isOpen} onCloseMenu={onCloseMenu}>
			<View style={styles.itemsWrapper}>
				{/* TOP NAVIGATION */}
				<View>
					{topNavigationList.map(({ name, icon, isActive, onPress }) => (
						<ListItem
							key={name}
							title={name}
							rightIcon={icon}
							containerStyle={StyleSheet.flatten([isActive && styles.selectedItem])}
							titleStyle={StyleSheet.flatten([styles.listItemTitle, isActive && styles.selectedItemText])}
							bottomDivider={true}
							onPress={onPress}
						/>
					))}
				</View>

				{/* BOTTOM NAVIGATION */}
				<View style={styles.bottomNavigationWrapper}>
					{bottomNavigationList.map(({ name, description, icon, isActive, onPress }) => (
						<ListItem
							key={name}
							title={name}
							subtitle={description}
							rightIcon={icon}
							containerStyle={StyleSheet.flatten([isActive && styles.selectedItem])}
							titleStyle={StyleSheet.flatten([styles.listItemTitle, isActive && styles.selectedItemText])}
							subtitleStyle={styles.listItemSubtitle}
							bottomDivider={true}
							onPress={onPress}
						/>
					))}
				</View>
			</View>
		</MenuWrapper>
	);
};

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
	itemsWrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	bottomNavigationWrapper: {
		borderTopWidth: 0.3,
		borderTopColor: toRgba(Colors.Black, 0.8),
	},
	listItemTitle: {
		fontSize: 16,
		paddingTop: IS_IOS ? 5 : 0,
		fontFamily: Fonts.Kelson,
	},
	selectedItem: {
		backgroundColor: Colors.Purple,
	},
	selectedItemText: {
		color: Colors.White,
		fontWeight: 'bold',
	},
	listItemSubtitle: {
		color: Colors.LightGrey,
	},
});

const mapStateToProps = (state: StoreModel): IState => ({
	covidConfirmed: getCovidConfirmed(state),
	isCovidLoading: state.covid.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onLogout: () => dispatch(logoutStart(null)),
	onFetchCovidConfirmed: () => dispatch(COVID_ACTION_CREATORS.FETCH.START(undefined)),
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
