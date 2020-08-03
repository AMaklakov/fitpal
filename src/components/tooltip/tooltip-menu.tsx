import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Icon, IconProps, ListItem, ListItemProps, Tooltip } from 'react-native-elements';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';

export interface ITooltipMenuItem extends ListItemProps {
	key: string;
	isShown?: boolean;
}

interface IProps {
	items: ITooltipMenuItem[];
	icon?: IconProps;
	tooltipContainerStyle?: StyleProp<ViewStyle>;
	tooltipInnerContainerStyle?: StyleProp<ViewStyle>;
	tooltipIconStyle?: StyleProp<ViewStyle>;
	iconStyle?: StyleProp<ViewStyle>;
	closeOnAction?: boolean;
}

export const TooltipMenu: FC<IProps> = props => {
	const { items, tooltipContainerStyle, tooltipInnerContainerStyle, icon = { name: 'more-vert' } } = props;
	const { tooltipIconStyle, iconStyle, closeOnAction } = props;

	const tooltipRefInner = useRef<Tooltip>(null);

	const currentIcon = useMemo(() => icon ?? { name: 'more-vert' }, [icon]);

	const handleItemPress = useCallback(
		(item: ITooltipMenuItem) => (e: GestureResponderEvent) => {
			if (closeOnAction) {
				tooltipRefInner.current?.toggleTooltip();
			}
			item?.onPress?.(e);
		},
		[closeOnAction]
	);

	return (
		<Tooltip
			ref={tooltipRefInner}
			withPointer={false}
			containerStyle={StyleSheet.flatten([styles.tooltip, tooltipContainerStyle])}
			width={200}
			popover={
				<View style={[styles.tooltipInner, tooltipInnerContainerStyle]}>
					{items
						?.filter(item => item.isShown !== false)
						?.map(item => (
							<ListItem
								{...item}
								onPress={handleItemPress(item)}
								titleStyle={[styles.listItemTitle, item.titleStyle]}
								containerStyle={styles.listItemContainer}
							/>
						))}
				</View>
			}>
			<View style={tooltipIconStyle}>
				<Icon {...currentIcon} style={StyleSheet.flatten([styles.icon, iconStyle])} />
			</View>
		</Tooltip>
	);
};

const styles = StyleSheet.create({
	tooltip: {
		height: 'auto',
		backgroundColor: Colors.WhiteMilk,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	tooltipInner: {
		width: '100%',
	},
	listItemTitle: {
		fontSize: FontSizes.Small,
		fontFamily: Fonts.OswaldLight,
		fontWeight: '200',
	},
	listItemContainer: {
		backgroundColor: Colors.WhiteMilk,
	},
	icon: {
		height: 45,
		width: 45,
		justifyContent: 'center',
		alignItems: 'center',
		flexShrink: 0,
	},
});
