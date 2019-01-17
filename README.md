# Auction With GraphQL and AWS Appsync
+ Support latest React Hook and GraphQL Subscription

1. create-react-app PROJECT_NAME --typescript or clone this project

+ PROJECT_NAME for example: Auction

2. "amplify init" and then choose

	+ Name of project: Auction

	+ Default Editor: Visual Studio Code

	+ Type of app: Javascript

	+ JS framework: React

	+ Source Directory: src

	+ Distribution Directory: build

	+ Build command: npm run-script build

	+ Start command: npm run-script build

3. "amplify add api",

	+ Choose GraphQL

	+ API name: Auction

	+ Authorization type: Cognito

	+ Do you want to use the default authentication and security configuration? Yes

    + Do you have an annotated GraphQL schema? No

    + Do you want a guided schema creation? Yes

    + Choose "Objects with fine-grained access control"

    + Do you want to edit the schema now? Yes

    + Modify schema as followed

        type Auction
            @model
            @auth(rules: [
                {
                allow: owner
                queries: null,
                mutations: [create, update, delete]
                }
            ])
            {
            id: ID!
            name: String!
            price: Float!
        }

4. "amplify push" to test deployment

	+ Do you want to generate code for your newly created GraphQL API? choose YES

	+ Then choose Typescript

	+ Then all enter to choose default options

	+ Finally, waiting generated code

5. Test with npm run start

6. "amplify publish" to test in production