import React, { FC, Ref, useMemo } from 'react';
import { Icon, IconProps, ListItem, ListItemProps, Tooltip } from 'react-native-elements';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';

export interface ITooltipMenuItem extends ListItemProps {
	key: string;
	isShown?: boolean;
}

interface IProps {
	items: ITooltipMenuItem[];
	tooltipRef?: Ref<Tooltip>;
	icon?: IconProps;
	tooltipContainerStyle?: StyleProp<ViewStyle>;
	tooltipInnerContainerStyle?: StyleProp<ViewStyle>;
}

export const TooltipMenu: FC<IProps> = props => {
	const { items, tooltipRef, tooltipContainerStyle, tooltipInnerContainerStyle, icon = { name: 'more-vert' } } = props;

	const currentIcon = useMemo(() => icon ?? { name: 'more-vert' }, [icon]);

	return (
		<Tooltip
			ref={tooltipRef}
			withPointer={false}
			containerStyle={StyleSheet.flatten([styles.tooltip, tooltipContainerStyle])}
			width={200}
			popover={
				<View style={[styles.tooltipInner, tooltipInnerContainerStyle]}>
					{items
						?.filter(item => item.isShown !== false)
						?.map(item => (
							<ListItem {...item} titleStyle={[styles.listItemTitle, item.titleStyle]} />
						))}
				</View>
			}>
			<Icon {...currentIcon} style={styles.icon} />
		</Tooltip>
	);
};

const styles = StyleSheet.create({
	tooltip: {
		height: 'auto',
		backgroundColor: Colors.White,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	tooltipInner: { width: '100%' },
	listItemTitle: {
		fontSize: FontSizes.Small,
		fontFamily: Fonts.Kelson,
	},
	icon: {
		height: 45,
		width: 45,
		justifyContent: 'center',
		alignItems: 'center',
		flexShrink: 0,
	},
});
