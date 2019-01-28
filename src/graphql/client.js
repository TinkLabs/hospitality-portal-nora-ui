import { GraphQLClient } from 'graphql-request';

//http://ecs-nora-dev-alb-1099166829.ap-southeast-1.elb.amazonaws.com/graphql
console.log(process.env.REACT_APP_SERVER_HOST);

const client = new GraphQLClient(`${process.env.REACT_APP_SERVER_HOST}/graphql`, {
  headers: {
    'Accept-Language': 'ja_JP',
    'X-Requested-Client': 'CMS'
  }
});

export default client;