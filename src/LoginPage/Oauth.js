import axios from 'axios';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { app } from '../constant';

export const Oauth = () => {

    const [searchParams] = useSearchParams(); // Access the query parameters
  const code = searchParams.get('code');
  const navigate = useNavigate();
  console.log("code",code)
  if(code)
    {
       axios.post(`${app.backendUrl}/auth/callback`,
        {code}
      ).then((data)=>{
        console.log(data.data.redirectUrl,"data.data.redirectUrl")
        navigate(data.data.redirectUrl)
        console.log("data",data.data)
      }).catch((err)=>{
        console.log(err)
      })

  }

        const googlelogin=async()=>{
            try {
                const authUrl=await axios.get(`${app.backendUrl}/auth/google`)
                window.location.href = authUrl.data;
                console.log(authUrl.data)
            } catch (err) {
                console.error("❌ Login error:", err.response?.data || err.message);
            }
          }

    return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Login with Google</h1>
     <button type='submit' onClick={googlelogin}>Login wth Google</button>
    </div>
  );
}
