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
import { COVID_ACTION_CREATORS } from '@redux/action/covid.action';
import { getCovidConfirmed } from '@redux/selector/covid.selector';

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

export const MenuComponent = (props: IProps & IState & IDispatch) => {
	const { isOpen, onCloseMenu, navigate, activeRoute, onFetchCovidConfirmed, covidConfirmed } = props;
	const { t } = useTranslation();

	const goToPage = (page: Routes) => () => navigate(page);

	useEffect(() => {
		onFetchCovidConfirmed();
	}, [onFetchCovidConfirmed]);

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
					<MenuItem
						item={{
							text: t('Statistics'),
							icon: <ChevronRightIcon />,
							isActive: activeRoute === Routes.Statistics,
						}}
						onPress={goToPage(Routes.Statistics)}
					/>
				</View>

				{/* BOTTOM NAVIGATION */}
				<View style={styles.bottomNavigationWrapper}>
					<MenuItem
						item={{
							text: t('Covid |count|', { value: covidConfirmed }),
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
	covidConfirmed: getCovidConfirmed(state),
	isCovidLoading: state.covid.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onFetchCovidConfirmed: () => dispatch(COVID_ACTION_CREATORS.FETCH.START(undefined)),
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
