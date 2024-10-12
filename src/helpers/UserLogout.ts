import { state } from "@/store/poxy";
import axios from "axios";


export const UserLogout=async()=>{
    try {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/Logout`, {user:true},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',  // Ensure the content type is correct
            }
          }).then((res) => {
            state.isActive = false;
            return res
          }).catch((err) => {
            const { response } = err;
            if (!response?.data?.success) {
              state.isActive = false;
            }
            return err
          })
      } catch (error) {
        console.log(error);
        return error
      }
}