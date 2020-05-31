import React, { FC, useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StringInput } from '@inputs/string-input/string-input';
import { useTranslation } from 'react-i18next';
import { Colors } from '@css/colors.style';
import { IntegerNumberInput } from '@inputs/integer-number-input/integer-number-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/navigator';
import { IRegisterRequestBody } from '@model/register-request-body.model';
import { Dispatch } from 'redux';
import { registerStart } from '@redux/action/user.action';
import { Button } from '@components/button/button';
import { FontSizes } from '@css/fonts';

interface IState {}

interface IDispatch {
	onRegister: (body: IRegisterRequestBody) => void;
}

interface IProps extends NavigationPropsModel {}

const Registration: FC<IProps & IState & IDispatch> = props => {
	const { navigation, onRegister } = props;
	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [middleName, setMiddleName] = useState('');

	const [isMale] = useState(true);
	const [age, setAge] = useState('18');
	const [weight, setWeight] = useState('60');

	const handleLogin = useCallback(() => navigation.navigate(Routes.Login), [navigation]);

	const handleRegister = useCallback(() => {
		if (!email || !password || !weight) {
			Alert.alert('Enter email, password and weight');
			return;
		}

		onRegister({
			email,
			password,
			age,
			firstName,
			isMale,
			lastName,
			middleName,
			weight,
		});
	}, [age, email, firstName, isMale, lastName, middleName, onRegister, password, weight]);

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<View style={styles.inputWrapper}>
					<StringInput value={email} onChange={setEmail} label={t('Enter email')} />
				</View>

				<View style={styles.inputWrapper}>
					<StringInput value={password} onChange={setPassword} isPassword={true} label={t('Enter password')} />
				</View>

				<View style={styles.inputWrapper}>
					<StringInput value={firstName} onChange={setFirstName} label={t('Enter first name')} />
				</View>

				<View style={styles.inputWrapper}>
					<StringInput value={lastName} onChange={setLastName} label={t('Enter last name')} />
				</View>

				<View style={styles.inputWrapper}>
					<StringInput value={middleName} onChange={setMiddleName} label={t('Enter middle name')} />
				</View>

				{/*	TODO add sex switch */}

				<View style={styles.inputWrapper}>
					<IntegerNumberInput label={t('Enter age')} value={age} onChange={setAge} />
				</View>

				<View style={styles.inputWrapper}>
					<IntegerNumberInput label={t('Enter weight')} value={weight} onChange={setWeight} />
				</View>

				<View style={styles.buttonsWrapper}>
					<View>
						<Text>{t('Already have account?')} </Text>
						<Button type="clear" onPress={handleLogin} buttonStyle={styles.loginButton} title={t('Go to Login')} />
					</View>

					<Button onPress={handleRegister} title={t('Register')} disabled={!email || !password || !weight} />
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	inputWrapper: {
		width: '85%',
	},
	buttonsWrapper: {
		width: '80%',
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	registerWrapper: {
		backgroundColor: Colors.LightBlue,
	},
	registerText: {
		color: Colors.White,
	},
	link: {
		fontSize: FontSizes.Medium,
		color: Colors.DarkBlue,
		textDecorationLine: 'underline',
	},
	loginButton: { paddingVertical: 0 },
	loginContainer: { alignItems: 'baseline' },
});

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onRegister: (body: IRegisterRequestBody) => dispatch(registerStart(body)),
});

export const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(Registration);
