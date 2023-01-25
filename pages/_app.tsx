import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '../lib/store';
import Layout from '../Components/Layout';
import { Lato, Montserrat } from '@next/font/google';
import '../styles/globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const mont = Lato({
	subsets: ['latin'],
	weight: ['400'],
});

type ComponentWithPageLayout = AppProps & {
	Component: AppProps['Component'] & {
		PageLayout?: any;
	};
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main className={mont.className}>
			<PayPalScriptProvider
				options={{ 'client-id': process.env.PAYPAL_CLIENT_ID as string }}>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</PayPalScriptProvider>
		</main>
	);
}

export default MyApp;
