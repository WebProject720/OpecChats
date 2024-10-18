import axios from "axios";


export const UploadFile = async (file: any) => {
    if (!file) {
        return { success: false, msg: 'Please select file' }
    }
    const form = new FormData();
    form.append('image', file);
    // console.log(file);
    // for (const [key, value] of form?.entries()) {
    //     console.log(`${key}:`, value);
    // }



    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/group/upload`, form,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure the content type is correct
                }
            });
        // console.log(res?.data?.data);
        return { data: res?.data?.data, success: true }
    } catch (error) {
        console.log(error);
        return { success: false, msg: 'Something went wrong' }
    }
}