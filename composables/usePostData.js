export default function usePostData() {
    const mapDetailsFromOpenLibrary = (bookData) => {
        // map book data to the format required for the sheet
        return {
            //
        };
    }
    const isLoading = ref(false);

    const postData = async (payload) => {
        try {
            isLoading.value = true;
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
            isLoading.value = false;
            return response;
        } catch (error) {
            isLoading.value = false;
            throw new Error(error || 'Unknown error occurred.');
        }
    }
  
    return {
      mapDetailsFromOpenLibrary,
      postData,
        isLoading
    };
  }