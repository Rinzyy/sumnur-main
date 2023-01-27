import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	organization: 'org-i5ZJjyWAyhGgofxS14HjKmEZ',
	apiKey: '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',
});
export const openai = new OpenAIApi(configuration);
