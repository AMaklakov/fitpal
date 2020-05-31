import React from 'react';
import { BaseHeading, IHeadingProps } from '@components/heading/base-heading';
import { FontSizes } from '@css/fonts';

export const H1 = (props: IHeadingProps) => <BaseHeading fontSize={FontSizes.H1} {...props} />;
