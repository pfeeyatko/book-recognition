import { errorMessages } from "vue/compiler-sfc";

export default function usePostData() {
    const mapDetailsFromOpenLibrary = (bookData) => {
        // map book data to the format required for the sheet
        return {
            //
        };
    }

    const postData = async (payload) => {
        try {
            const response = await $fetch('/api/sendToSheet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            })
        
            if (response.status !== 'success') {
                throw new Error(response.message || 'Unknown error occurred.');
            }

            return response;
        } catch (error) {
            throw new Error(error || 'Unknown error occurred.');
        }
    }
  
    return {
      mapDetailsFromOpenLibrary,
      postData,
    };
  }