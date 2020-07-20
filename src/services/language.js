// @flow

import fr from '../flags/flag-fr.png';
import en from '../flags/flag-england.png';
import es from '../flags/flag-es.png';
import { currentSessionService } from './sessionServiceInstance';

const LANGUAGE_LOCAL_STORAGE = 'LANGUAGE';

const DEFAULT_LANG = 'fr';

export type Language = {
  code: string,
  imgPath: string,
};
const languagesAvailable: Language[] = [
  {
    code: 'fr',
    imgPath: fr,
  },
  {
    code: 'en',
    imgPath: en,
  },
  {
    code: 'es',
    imgPath: es,
  },
];

let localLanguage: ?Language = null;

function browserLanguage() {
  return navigator.language ?
    navigator.language.substring(0, 2)
    : null;
}

function languageByCode(code: string) {
  return languagesAvailable
    .filter(language => language.code === code)[0];
}

export function storeLang(lang: string) {
  localStorage.setItem(LANGUAGE_LOCAL_STORAGE, lang);
  localLanguage = languageByCode(lang);
}

function sessionLanguage() {
  const currentUser = currentSessionService().currentUser();
  return currentUser ? currentUser.businessUnitCountryCode : null;
}

export function languages() {
  return languagesAvailable;
}

export const reloadLanguage: () => Language = () => {
  localLanguage = languageByCode(localStorage.getItem(LANGUAGE_LOCAL_STORAGE)
    || sessionLanguage()
    || browserLanguage()
    || DEFAULT_LANG);
  return localLanguage;
};

export const currentLanguage: () => Language = () => {
  if (localLanguage) {
    return localLanguage;
  }

  return reloadLanguage();
};
