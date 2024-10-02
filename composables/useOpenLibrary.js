export default function useOpenLibrary() {
  const search = async (isbn = '') => {
    try {
      const data = await $fetch(`https://openlibrary.org/search.json?isbn=${isbn}`);

      if (data.numFound === 0) {
        return {
          error: true,
          message: `No book found with ISBN: ${isbn}`,
        };
      }

      return {
        title: data.docs[0].title, // string
        author: data.docs[0].author_name, // array
        genre: data.docs[0].subject.slice(0, 3), // array
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
