export default defineEventHandler(async (event) => {
    try {
      const config = useRuntimeConfig()
      const SHEET_SCRIPT_URL = config.SHEET_SCRIPT_URL
  
      // Parse the incoming request body
      const body = await readBody(event)
  
      // Forward the POST request to the Google Apps Script URL
      const response = await $fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
  
      // Return the response from Google Apps Script to the client
      return {
        status: 'success',
        data: response,
      }
    } catch (error) {
      console.error('Error in add-book API:', error)
      return {
        status: 'error',
        message: 'Failed to submit the form. Please try again later.',
      }
    }
  })
  