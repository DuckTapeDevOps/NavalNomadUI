import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// These values will be available after running `tofu apply` in the frontend directory
// You'll need to:
// 1. Get the User Pool ID from the AWS Console or terraform output
// 2. Get the Client ID from the AWS Console or terraform output
// 3. Get the Identity Pool ID from the AWS Console or terraform output
// 4. Set your domain name (e.g., navalnomad.com)

const isDevelopment = import.meta.env.DEV;

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_iorZobDNZ',
      userPoolClientId: 'naval-nomad-web-client',
      identityPoolId: 'us-east-1:4dd49584-e018-46b6-a2f6-a3463930d1fb',
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        oauth: {
          domain: 'naval-nomad.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'],
          responseType: 'code' as const,
          redirectSignIn: isDevelopment 
            ? ['http://localhost:5173/auth/callback']
            : ['https://navalnomad.com/auth/callback'],
          redirectSignOut: isDevelopment 
            ? ['http://localhost:5173']
            : ['https://navalnomad.com']
        }
      }
    }
  }
};

Amplify.configure(amplifyConfig); 