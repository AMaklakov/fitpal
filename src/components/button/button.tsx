import React, { FC } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';

interface IProps extends ButtonProps {}

export const Button: FC<IProps> = props => {
	const { type, ...rest } = props;

	return <ButtonComponent type={type} {...rest} />;
};

// TODO write styles here
