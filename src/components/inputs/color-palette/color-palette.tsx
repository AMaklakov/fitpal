import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorPaletteItem } from '@inputs/color-palette/color-palette-item';

interface IProps {
	colors: string[];
	onChange: (v: string) => void;
	defaultValue?: string;
	value?: string;
	colorsInRow?: number;
}

export const ColorPalette: FC<IProps> = props => {
	const { colors, defaultValue, onChange, value, colorsInRow = 4 } = props;

	const [selectedColor, setSelectedColor] = useState<string>(defaultValue || value || colors[0]);

	useEffect(() => {
		if (value) {
			setSelectedColor(value);
		}
	}, [value]);

	const handleSelect = useCallback(
		(selected: string) => {
			onChange(selected);
			if (!value) {
				setSelectedColor(selected);
			}
		},
		[onChange, value]
	);

	return (
		<View style={styles.wrapper}>
			{colors.map(color => (
				<ColorPaletteItem
					key={color}
					color={color}
					selected={color === selectedColor}
					onPress={handleSelect}
					colorsInRow={colorsInRow}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
});
