import { GraphQLClient } from 'graphql-request';
//http://ecs-nora-dev-alb-1099166829.ap-southeast-1.elb.amazonaws.com/graphql
const client = new GraphQLClient('http://localhost:8080/graphql', {
  headers: {
    'Accept-Language': 'ja_JP'
  }
});

export default client;