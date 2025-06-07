import { Amplify } from 'aws-amplify';

// These values will be available after running `tofu apply` in the frontend directory
// You'll need to:
// 1. Get the User Pool ID from the AWS Console or terraform output
// 2. Get the Client ID from the AWS Console or terraform output
// 3. Get the Identity Pool ID from the AWS Console or terraform output
// 4. Set your domain name (e.g., navalnomad.com)

Amplify.configure({
  Auth: {
    region: 'us-east-1', // Change this to your AWS region
    userPoolId: 'YOUR_USER_POOL_ID', // e.g., us-east-1_xxxxxxxx
    userPoolWebClientId: 'YOUR_CLIENT_ID', // e.g., xxxxxxxxxxxxxxxxxxxxxxxxxx
    identityPoolId: 'YOUR_IDENTITY_POOL_ID', // e.g., us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    oauth: {
      domain: 'YOUR_COGNITO_DOMAIN', // e.g., naval-nomad.auth.region.amazoncognito.com
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://YOUR_DOMAIN/auth/callback', // e.g., https://navalnomad.com/auth/callback
      redirectSignOut: 'https://YOUR_DOMAIN', // e.g., https://navalnomad.com
      responseType: 'code'
    }
  }
}); 