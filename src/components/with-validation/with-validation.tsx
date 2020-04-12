import { Big, BigSource } from 'big.js';
import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { isPresent } from '@util/type.util';
import { Colors } from '@css/colors.style';

export type IErrors = { [k: string]: any } | null;

/**
 * [0] - restriction
 * [1] - error text
 *
 * TODO extend error text to be not only string, but a React.Element as well
 */
type IValidationItem<T> = [T, string];

interface IValidation {
	max?: IValidationItem<BigSource>;
	min?: IValidationItem<BigSource>;
	maxLength?: IValidationItem<number>;
	minLength?: IValidationItem<number>;
	isNumber?: IValidationItem<boolean>;

	needTrim?: boolean;
	errorTextStyle?: StyleProp<TextStyle>;

	onChange: (value: string, errors: IErrors) => void;
}

interface IComponent {
	onChange: (value: string) => void;
}

export const withValidation = <C extends IComponent>(component: FC<C>): FC<C & IValidation> => {
	return (props: C & IValidation) => {
		const { onChange, max, maxLength, min, minLength, isNumber = false, needTrim = false, errorTextStyle = {} } = props;

		const [errors, changeErrors] = useState<IErrors>(null);

		const checkErrors = (value: string) => {
			let errors: IErrors = {};

			if (needTrim) {
				value = value.trim();
			}

			if (isNumber || isPresent(min) || isPresent(max)) {
				try {
					// check is number or not
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const num = new Big(value);

					if (isPresent(min) && !checkMin(value, min[0])) {
						errors.min = min[1];
					}
					if (isPresent(max) && !checkMax(value, max[0])) {
						errors.max = max[1];
					}
				} catch (e) {
					errors.isNum = isNumber ? isNumber[1] : false;
				}
			}

			if (isPresent(minLength) && !checkMinLength(value, minLength[0])) {
				errors.minLength = minLength[1];
			}

			if (isPresent(maxLength) && !checkMaxLength(value, maxLength[0])) {
				errors.maxLength = maxLength[1];
			}

			if (Object.keys(errors).length === 0) {
				errors = null;
			}

			return errors;
		};

		const handleChange = (value: string) => {
			const errors = checkErrors(value);

			changeErrors(errors);
			onChange(value, errors);
		};

		return (
			<View>
				{component({ ...props, onChange: handleChange })}

				<View>
					{!!errors &&
						Object.keys(errors).map((e: string) => (
							<Text style={StyleSheet.flatten([styles.errorText, errorTextStyle])} key={e}>
								{errors[e]}
							</Text>
						))}
				</View>
			</View>
		);
	};
};

const checkMin = (v: string, min: BigSource) => new Big(v).gte(min);
const checkMax = (v: string, max: BigSource) => new Big(v).lte(max);
const checkMinLength = (v: string, length: number) => v.length >= length;
const checkMaxLength = (v: string, length: number) => v.length <= length;

const styles = StyleSheet.create({
	errorText: {
		color: Colors.LightRed,
		fontSize: 12,
	},
});
