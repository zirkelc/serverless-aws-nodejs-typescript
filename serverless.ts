import type { AWS } from '@serverless/typescript';

import schema from '@functions/hello/schema';

const serverlessConfiguration: AWS = {
  service: 'serverless-aws-nodejs-typescript',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  functions: {
    hello: {
      handler: `./src/functions/hello/handler.main`,
      events: [
        {
          http: {
            method: 'post',
            path: 'hello',
            request: {
              schemas: {
                'application/json': schema,
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
