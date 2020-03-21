import i18next, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
// TODO-mav add lazy async loading for translations
import enMessages from './messages/en.json';
import ruMessages from './messages/ru.json';

export enum Languages {
	Ru = 'ru',
	En = 'en',
}

const languageDetector: LanguageDetectorModule = {
	type: 'languageDetector',
	// TODO-mav add system-based language detection
	detect: () => Languages.En,
	init: () => {},
	cacheUserLanguage: () => {},
};

i18next
	.use(languageDetector)
	.use(initReactI18next)
	.init(
		{
			fallbackLng: Languages.En,
			debug: true,
			resources: {
				en: { translation: enMessages },
				ru: { translation: ruMessages },
			},
		},
		() => {}
	);

export const changeLanguage = (lang: Languages) => i18next.changeLanguage(lang);
