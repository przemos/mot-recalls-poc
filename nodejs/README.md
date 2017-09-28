# NodeJS Recalls Lambda POC 

## Setup

1. Install serverless

```npm install serverless -g```

2. Set env variables:
* SMMT_API_KEY - encrypted API KEY (Base64 encoded) with KMS key under ARN pointed to with RECALLS_KMS_ARN
* SMMT_API_URI
* RECALLS_KMS_ARN

3. Deploy with serverless

```serverless deploy --aws-profile <your-profile-name-goes-here>```
