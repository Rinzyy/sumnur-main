const { Translate } = require('@google-cloud/translate').v2;
const { path } = require('path');

// Instantiates a client
const translate = new Translate({
	projectId: 'sumnur-acac8',
	credentials: {
		type: process.env.SERVICE_ACCOUNT_TYPE,
		project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
		private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
		private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
		client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
		client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
		auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
		token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
		auth_provider_x509_cert_url:
			process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
		universe_domain: process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
	},
});

export async function quickStart(text: any, target: any) {
	// Translates some text into Russian
	const [translation] = await translate.translate(text, target);
	// console.log(`Text: ${text}`);
	// console.log(`Translation: ${translation}`);
	return translation;
}

export async function detectLanguage(text: any) {
	let [detections] = await translate.detect(text);
	detections = Array.isArray(detections) ? detections : [detections];
	// console.log('Detections:');
	detections.forEach((detection: any) => {
		console.log(`${detection.input} => ${detection.language}`);
	});
	return detections[0];
}
