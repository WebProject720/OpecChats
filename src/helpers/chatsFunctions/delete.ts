import axios from "axios";




export const deleteChat = async (identifier: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/chat/delete`, { identifier },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',  // Ensure the content type is correct
                }
            });
        return { data: res?.data?.data, success: true }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: error,
        }
    }
}