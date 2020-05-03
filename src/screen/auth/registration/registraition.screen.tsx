import React, { FC, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { StringInput } from '@inputs/string-input/string-input';
import { useTranslation } from 'react-i18next';
import { Colors } from '@css/colors.style';
import { IntegerNumberInput } from '@inputs/integer-number-input/integer-number-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/navigator';

interface IState {}

interface IDispatch {}

interface IProps extends NavigationPropsModel {}

const Registration: FC<IProps & IState & IDispatch> = props => {
	const { navigation } = props;
	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [middleName, setMiddleName] = useState('');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isMale, setIsMale] = useState(true);
	const [age, setAge] = useState('18');
	const [weight, setWeight] = useState('60');

	const handleLogin = useCallback(() => navigation.navigate(Routes.Login), [navigation]);

	const handleRegister = useCallback(() => {}, []);

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<View style={styles.inputWrapper}>
					<Text>{t('Enter email')}</Text>
					<StringInput value={email} onChange={setEmail} />
				</View>

				<View style={styles.inputWrapper}>
					<Text>{t('Enter password')} </Text>
					<StringInput value={password} onChange={setPassword} isPassword={true} />
				</View>

				<View style={styles.inputWrapper}>
					<Text>{t('Enter first name')}</Text>
					<StringInput value={firstName} onChange={setFirstName} />
				</View>

				<View style={styles.inputWrapper}>
					<Text>{t('Enter last name')}</Text>
					<StringInput value={lastName} onChange={setLastName} />
				</View>

				<View style={styles.inputWrapper}>
					<Text>{t('Enter middle name')}</Text>
					<StringInput value={middleName} onChange={setMiddleName} />
				</View>

				{/*	TODO add sex switch */}

				<View style={styles.inputWrapper}>
					<Text>{t('Enter age')}</Text>
					<IntegerNumberInput value={age} onChange={setAge} />
				</View>

				<View style={styles.inputWrapper}>
					<Text>{t('Enter weight')}</Text>
					<IntegerNumberInput value={weight} onChange={setWeight} />
				</View>

				<View style={styles.buttonsWrapper}>
					<View>
						<Text>{t('Already have account?')} </Text>
						<Text onPress={handleLogin} style={styles.link}>
							{t('Go to Login')}
						</Text>
					</View>

					<TouchableOpacity onPress={handleRegister} style={[styles.buttonWrapper, styles.registerWrapper]}>
						<Text style={styles.registerText}>{t('Register')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
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
	buttonsWrapper: {
		width: '80%',
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	buttonWrapper: {
		height: 40,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginText: {
		color: Colors.LightBlue,
	},
	registerWrapper: {
		backgroundColor: Colors.LightBlue,
	},
	registerText: {
		color: Colors.White,
	},
	link: {
		color: Colors.DarkBlue,
		textDecorationLine: 'underline',
	},
});

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (): IDispatch => ({});

export const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(Registration);