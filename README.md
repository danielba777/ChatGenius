# ChatGenius
> Micro SaaS with AI Tools built with the MERN stack.

ChatGenius is a web application built with the MERN stack. It features a text summarizer, paragraph generator, code generator, image generator, and chatbot functionality. The application integrates Stripe API for payments and OpenAI API for generating text and images. 

# Features

**Text Summarizer**
* Quickly condense long texts into concise summaries

**Paragraph Generator**
* Generate coherent paragraphs from given topics

**Code Generator**
* Generate code snippets for JavaScript from given instructions

**Image Generator**
* Create custom scifi images based on textual descriptions

**Chatbot Functionality**
* Engage with a responsive chatbot for customer support or information retrieval

# Technical Highlights:

* Built with MERN Stack:
  + Utilizes MongoDB, Express.js, React.js, and Node.js for robust performance and scalability.
* Stripe API Integration:
  + Secure and seamless payment processing.
  + Supports subscription management and transactions.
* OpenAI API Integration:
  + Leverages advanced AI models for text and image generation.
  + Ensures high-quality and relevant content output.

# Test User Accounts
```
# Account with activated subscription
test@email.com
P: 123456

-- OR -- 

**Try to checkout with this dummy data:**

Credit Card Number: *4242 4242 4242 4242*

Choose any secret and date (in the future)  

```

# Usage

* Create a MongoDB database and obtain your **MONGO_URI**
* Create a Stripe account and obtain your **STRIPE_SECRET** and **STRIPE_WEBHOOK_SECRET**
* Create a OpenAI account and obtain your **OPENAI_API_SECRET**

## .env - Variables

Rename the example.env to .env and add the following:
```
port=4242
MONGO_URI=YOUR_MONGO_URI_HERE
JWT_ACCESS_SECRET=YOUR_JWT_SECRET_HERE
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET_HERE
JWT_ACCESS_EXPIRE=YOUR_JWT_ACCESS_EXPIRE_HERE // f.ex. 15min (only for development)
JWT_REFRESH_EXPIRE=YOUR_JWT_REFRESH_EXPIRE_HERE // f.ex. 30d (only for development)
OPENAI_API_SECRET=YOUR_OPENAI_API_SECRET_HERE
STRIPE_SECRET=YOUR_STRIPE_SECRET_HERE
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET_HERE
```
You can change the JWT_ACCESS_SECRET and the JWT_REFRESH_SECRET to a value you want to use as a secret key

## Install dependencies (frontend + backend)
```
npm install
cd client
npm install
```

## Run
```
# Run frontend & backend
npm run dev

# Run backend only
npm run start
```

# Build & Deploy

## Create frontend production build
```
cd client
npm run build
```


