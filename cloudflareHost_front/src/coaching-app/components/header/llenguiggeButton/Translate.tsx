import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageButton from './llenguiggeButton';

const Translate = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ka', label: 'ქართული' },
  ];
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };
  return (
    <LanguageButton
      open={open}
      setOpen={setOpen}
      i18n={i18n}
      languages={languages}
      changeLanguage={changeLanguage}
    />
  );
};

export default Translate;