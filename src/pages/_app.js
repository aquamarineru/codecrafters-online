import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { Navbar, Layout } from '@/components/index'

function App({ Component, pageProps }) {
  
  return (
    <>
    <header role="banner">
      <Navbar/>
    </header>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default appWithTranslation(App);