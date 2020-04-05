import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IMenuWrapperProps, MenuWrapper } from '@components/menu/menu-wrapper';
import { MenuItem } from '@components/menu/menu-item';
import { Routes } from '@screen/navigator';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@icons/chevron-right.icon';
import { SettingsIcon } from '@icons/settings.icon';
import { Colors } from '@css/colors.style';

interface IProps extends IMenuWrapperProps {
	navigate: (route: Routes) => void;
	activeRoute: Routes;
}

export const Menu = (props: IProps) => {
	const { isOpen, onCloseMenu, navigate, activeRoute } = props;
	const { t } = useTranslation();

	const goToPage = (page: Routes) => () => navigate(page);

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
		borderTopColor: Colors.BlackTranslucent,
		paddingTop: 10,
	},
});
