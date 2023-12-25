
# Sumnur Text Tool

Sumnur Text Tool is a web application that utilizes AI to perform various text-related tasks, including text revision, converting normal text to email format, and summarizing text. It makes use of OpenAI GPT-3, Firebase, Google Cloud Translation API, and Tailwind CSS for its design.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you can run Sumnur Text Tool, make sure you have the following prerequisites installed on your system:

- Node.js and npm

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Configuration

You'll need to set up environment variables and obtain a Google Cloud API key to use Sumnur Text Tool effectively. Here's what you need to do:
1. Setup firebase configuration and replace the config in firebase.js 
2. Create a `.env` file in the project root directory.
3. Add the following environment variables to your `.env` file:

```plaintext
#Paypal test account (OPTIONAL)
NEXT_PUBLIC_PAYPAL_CLIENT_ID= 

#OPEN AI API
OPENAI_API_KEY=
OPENAI_ORG_ID=

#Google cloud platform service Account JSON key
SERVICE_ACCOUNT_TYPE=service_account
SERVICE_ACCOUNT_PROJECT_ID=
SERVICE_ACCOUNT_PRIVATE_KEY_ID=
SERVICE_ACCOUNT_PRIVATE_KEY=
SERVICE_ACCOUNT_CLIENT_EMAIL=
SERVICE_ACCOUNT_CLIENT_ID=
SERVICE_ACCOUNT_AUTH_URI=
SERVICE_ACCOUNT_TOKEN_URI=
SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=
SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=
SERVICE_ACCOUNT_UNIVERSE_DOMAIN=



```

## Usage

Revise Tool: Paraphrase and enhance your text to improve readability while correcting writing issues.
<img width="1369" alt="Screen Shot 2023-12-25 at 6 14 53 PM" src="https://github.com/Rinzyy/sumnur-main/assets/80165041/9bff9865-1e7b-43f1-92ff-f4602f669cb2">

Summary Tool: Summarize text from any language into English, condensing lengthy content into concise summaries.
<img width="1364" alt="Screen Shot 2023-12-25 at 6 15 50 PM" src="https://github.com/Rinzyy/sumnur-main/assets/80165041/140d6b81-344e-44fe-9b91-7d5f3dc2e29c">
<img width="1369" alt="Screen Shot 2023-12-25 at 6 16 08 PM" src="https://github.com/Rinzyy/sumnur-main/assets/80165041/a2f1b381-4334-4607-9b08-f7c918d88cf5">


Email Converter Tool: Automatically format text into a formal, professional email structure and prevent common email communication mistakes.
<img width="1363" alt="Screen Shot 2023-12-25 at 6 16 42 PM" src="https://github.com/Rinzyy/sumnur-main/assets/80165041/1ad1e43f-6bb2-469b-9491-a722b26a6f75">

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
