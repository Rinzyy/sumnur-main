import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '../lib/store';
import Layout from '../Components/Layout';
import { Lato, Montserrat } from '@next/font/google';
import '../styles/globals.css';

const mont = Lato({
	subsets: ['latin'],
	weight: ['400'],
});

type ComponentWithPageLayout = AppProps & {
	Component: AppProps['Component'] & {
		PageLayout?: any;
	};
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
	return (
		<main className={mont.className}>
			<Provider store={store}>
				<Layout>
					{Component.PageLayout ? (
						<Component.PageLayout>
							<Component {...pageProps} />
						</Component.PageLayout>
					) : (
						<Component {...pageProps} />
					)}
				</Layout>
			</Provider>
		</main>
	);
}

export default MyApp;
