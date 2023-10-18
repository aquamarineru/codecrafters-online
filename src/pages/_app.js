import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { Navbar, Layout } from '@/components/index'
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  const { footerData, locale } = pageProps;
  return (
    <div >
    <header>
      <Navbar/>
    </header>
    <Layout footerData={footerData} locale={locale}>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
    </div>
  );
}

export default appWithTranslation(App);