import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IMenuWrapperProps, MenuWrapper } from '@components/menu/menu-wrapper';
import { MenuItem } from '@components/menu/menu-item';
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
import { fetchCovidData } from '@redux/action/covid.action';

interface IState {
	covidConfirmed: number;
	isCovidLoading: boolean;
}

interface IDispatch {
	getCovidConfirmedCount: () => void;
}

interface IProps extends IMenuWrapperProps {
	navigate: (route: Routes) => void;
	activeRoute: Routes;
}

export const MenuComponent = (props: IProps & IState & IDispatch) => {
	const { isOpen, onCloseMenu, navigate, activeRoute, getCovidConfirmedCount, covidConfirmed, isCovidLoading } = props;
	const { t } = useTranslation();

	const goToPage = (page: Routes) => () => navigate(page);

	useEffect(() => {
		getCovidConfirmedCount();
	}, [getCovidConfirmedCount]);

	return (
		<MenuWrapper isOpen={isOpen} onCloseMenu={onCloseMenu}>
			<View style={styles.itemsWrapper}>
				{/* TOP NAVIGATION */}
				<View>
					<MenuItem
						item={{ text: t('Calendar'), icon: <ChevronRightIcon />, isActive: activeRoute === Routes.Calendar }}
						onPress={goToPage(Routes.Calendar)}
					/>
					<MenuItem
						item={{
							text: t('Exercise list'),
							icon: <ChevronRightIcon />,
							isActive: activeRoute === Routes.ExerciseList,
						}}
						onPress={goToPage(Routes.ExerciseList)}
					/>
				</View>

				{/* BOTTOM NAVIGATION */}
				<View style={styles.bottomNavigationWrapper}>
					<MenuItem
						item={{
							text: t('Covid |count|', { count: isCovidLoading ? '...' : covidConfirmed }),
							icon: <DeadIcon />,
						}}
					/>
					<MenuItem
						item={{ text: t('Settings'), icon: <SettingsIcon />, isActive: activeRoute === Routes.Settings }}
						onPress={goToPage(Routes.Settings)}
					/>
				</View>
			</View>
		</MenuWrapper>
	);
};

const styles = StyleSheet.create({
	itemsWrapper: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	bottomNavigationWrapper: {
		borderTopWidth: 0.3,
		borderTopColor: toRgba(Colors.Black, 0.8),
		paddingTop: 10,
	},
});

const mapStateToProps = (state: StoreModel): IState => ({
	covidConfirmed: state.covid.confirmed,
	isCovidLoading: state.covid.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	getCovidConfirmedCount: () => dispatch(fetchCovidData()),
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
