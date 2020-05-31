import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StringInput } from '@inputs/string-input/string-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/navigator';
import { Colors } from '@css/colors.style';
import { ILoginRequestBody } from '@model/login-request-body';
import { Dispatch } from 'redux';
import { loginStart } from '@redux/action/user.action';
import { Button } from '@components/button/button';
import { FontSizes } from '@css/fonts';

interface IState {}

interface IDispatch {
	onLogin: (body: ILoginRequestBody) => void;
}

interface IProps extends NavigationPropsModel {}

const Login: FC<IProps & IState & IDispatch> = props => {
	const { navigation, onLogin } = props;
	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = useCallback(() => navigation.navigate(Routes.Registration), [navigation]);

	const handleLogin = useCallback(() => onLogin({ email, password }), [email, onLogin, password]);

	return (
		<View style={styles.wrapper}>
			<View style={styles.inputWrapper}>
				<StringInput label={t('Enter email')} value={email} onChange={setEmail} autoCapitalize="none" />
			</View>

			<View style={styles.inputWrapper}>
				<StringInput label={t('Enter password')} value={password} onChange={setPassword} isPassword={true} />
			</View>

			<View style={[styles.inputWrapper, styles.buttonWrapper]}>
				<View style={styles.registrationWrapper}>
					<Text>{t('Have no account?')} </Text>
					<Button type="clear" onPress={handleRegister} title={t('Register')} />
				</View>

				<Button onPress={handleLogin} title={t('Login')} disabled={!email || !password} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 20,
		alignItems: 'center',
	},
	inputWrapper: {
		width: '85%',
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	link: {
		fontSize: FontSizes.Medium,
		color: Colors.DarkBlue,
		textDecorationLine: 'underline',
	},
	registrationWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonWithIconWrapper: {
		backgroundColor: Colors.LightBlue,
		width: 100,
	},
	loginButtonText: {
		fontSize: FontSizes.Big,
	},
});

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onLogin: body => dispatch(loginStart(body)),
});

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
