import React, { FC, useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StringInput } from '@inputs/string-input/string-input';
import { useTranslation } from 'react-i18next';
import { IntegerNumberInput } from '@inputs/integer-number-input/integer-number-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/routes';
import { IRegisterRequestBody } from '@model/register-request-body.model';
import { Dispatch } from 'redux';
import { registerStart } from '@redux/action/user.action';
import { Button } from '@components/button/button';
import { H1 } from '@components/heading/h1';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
	// const [middleName, setMiddleName] = useState('');

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
			// middleName,
			weight,
		});
	}, [age, email, firstName, isMale, lastName, onRegister, password, weight]);

	return (
		<KeyboardAwareScrollView>
			<View style={styles.wrapper}>
				<H1 text={t('Registration')} />

				<StringInput value={email} onChange={setEmail} label={t('Enter email')} />
				<StringInput value={password} onChange={setPassword} isPassword={true} label={t('Enter password')} />
				<StringInput value={firstName} onChange={setFirstName} label={t('Enter first name')} />
				<StringInput value={lastName} onChange={setLastName} label={t('Enter last name')} />
				{/*<StringInput value={middleName} onChange={setMiddleName} label={t('Enter middle name')} />*/}
				{/*	TODO add sex switch */}
				<IntegerNumberInput label={t('Enter age')} value={age} onChange={setAge} />
				<IntegerNumberInput
					label={t('Enter weight')}
					value={weight}
					onChange={setWeight}
					rightIcon={<Text>{t('Kg')}</Text>}
					rightIconContainerStyle={styles.iconContainerStyle}
				/>

				<View style={styles.buttonsWrapper}>
					<View>
						<Text>{t('Already have account?')} </Text>
						<Button type="clear" onPress={handleLogin} buttonStyle={styles.loginButton} title={t('Go to Login')} />
					</View>

					<Button onPress={handleRegister} title={t('Register')} disabled={!email || !password || !weight} />
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		padding: 20,
	},
	iconContainerStyle: { marginVertical: 0 },
	buttonsWrapper: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	loginButton: { paddingVertical: 0 },
	loginContainer: { alignItems: 'baseline' },
});

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onRegister: (body: IRegisterRequestBody) => dispatch(registerStart(body)),
});

export const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(Registration);
