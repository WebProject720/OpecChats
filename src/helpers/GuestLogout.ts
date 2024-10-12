import { state } from "@/store/poxy";
import axios from "axios";


export const GuestLogout=async()=>{
    try {
       await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/GuestLogout`, {guest:true},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',  // Ensure the content type is correct
            }
          }).then((res) => {
            state.isGuest = false;
            return res;
          }).catch((err) => {
            const { response } = err;
            if (!response?.data?.success) {
              state.isGuest = false;
            }
            return err
          })
      } catch (error) {
        console.log(error);
        return error
      }
}