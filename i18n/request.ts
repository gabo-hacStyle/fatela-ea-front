import {getRequestConfig} from 'next-intl/server';
import { getCookie, getUserLocale } from '@/utils/cookiesManager';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  // console.log('Locale en request', locale);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});