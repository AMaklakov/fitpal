import React from 'react';
import { BaseMaterialIcon } from '@icons/base-material-icon';
import { IconProps } from '@icons/model/icon-props.type';
import { Colors } from '@css/colors.style';

export const ExitIcon = (props: IconProps) => <BaseMaterialIcon name="exit-to-app" color={Colors.Red} {...props} />;
