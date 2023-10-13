import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { Navbar, Layout } from '@/components/index'
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  
  return (
    <div >
    <header role="banner">
      <Navbar/>
    </header>
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
    </div>
  );
}

export default appWithTranslation(App);