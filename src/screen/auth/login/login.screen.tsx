import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StringInput } from '@inputs/string-input/string-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/navigator';
import { Colors } from '@css/colors.style';
import { ILoginRequestBody } from '@model/login-request-body';
import { Dispatch } from 'redux';
import { loginStart } from '@redux/action/user.action';

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
				<Text> {t('Enter email')} </Text>
				<StringInput value={email} onChange={setEmail} />
			</View>

			<View style={styles.inputWrapper}>
				<Text> {t('Enter password')} </Text>
				<StringInput value={password} onChange={setPassword} isPassword={true} />
			</View>

			<View style={[styles.inputWrapper, styles.buttonWrapper]}>
				<View style={styles.registrationWrapper}>
					<Text>{t('Have no account?')} </Text>
					<Text onPress={handleRegister} style={styles.link}>
						{t('Register')}
					</Text>
				</View>

				<View>
					<TouchableOpacity onPress={handleLogin} style={styles.buttonWithIconWrapper}>
						<Text style={[styles.loginButtonText]}>{t('Login')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
	},
	inputWrapper: {
		width: '80%',
		paddingTop: 15,
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	link: {
		color: Colors.DarkBlue,
		textDecorationLine: 'underline',
	},
	registrationWrapper: {
		flexDirection: 'row',
	},
	buttonWithIconWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.LightBlue,
		height: 40,
		width: 100,
	},
	loginButtonText: {
		color: Colors.White,
		fontSize: 18,
	},
});

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onLogin: body => dispatch(loginStart(body)),
});

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);