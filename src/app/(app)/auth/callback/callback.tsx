import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { useEffect } from 'react';
import { Loader } from '@/components/custom/loader';

export default async function Page(req: NextApiRequest, res: NextApiResponse) {
   const { code } = req.query;
   const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
   const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET;
   const redirectUri = `http://localhost:3000/auth/callback`;

   useEffect(() => {
      const Callback = async () => {
         try {
            // Exchange code for access token
            const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
               code,
               client_id: clientId,
               client_secret: clientSecret,
               redirect_uri: redirectUri,
               grant_type: 'authorization_code',
            });

            const { access_token, id_token } = tokenResponse.data;

            // Get user info from Google API
            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
               headers: {
                  Authorization: `Bearer ${access_token}`,
               },
            });

            const user = userInfoResponse.data;
            console.log(user);


            // Handle user authentication here (e.g., create a session or JWT)
            // Example: res.setHeader('Set-Cookie', 'token=your-jwt-token; HttpOnly; Path=/;')

            // Redirect to your desired page
            res.redirect('/');
         } catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).send('Authentication failed');
         }
      }
      Callback()
   }, [])

   return (
      <div>
         <Loader />
      </div>
   )
}
