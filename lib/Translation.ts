const { Translate } = require('@google-cloud/translate').v2;
const { path } = require('path');

// Instantiates a client
const translate = new Translate({
	projectId: 'sumnur-acac8',
	keyFilename: 'gcloud.json',
});
let test;

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
