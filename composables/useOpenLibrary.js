export default function useOpenLibrary() {
  const search = async (isbn = '') => {
    try {
      const data = await $fetch(`https://openlibrary.org/search.json?isbn=${isbn}`);

      if (data.numFound === 0) {
        return {
          error: true,
          message: `No book with ISBN: ${isbn} found`,
        };
      }

      return {
        error: false,
        title: data.docs[0].title, // string
        author: data.docs[0].author_name, // array
        yearPublished: data.docs[0].publish_year, // array
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  };

  return {
    search,
  };
}
