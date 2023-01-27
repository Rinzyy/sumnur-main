import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	organization: 'org-i5ZJjyWAyhGgofxS14HjKmEZ',
	apiKey: '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',
});
export const openai = new OpenAIApi(configuration);
