export default function useOpenLibrary() {
  const search = async (isbn = '') => {
    const { data, status, error } = await useFetch(`https://openlibrary.org/search.json?isbn=${isbn}`);

    if (status.value !== 'success' && error.value) {
      return {
        error: true,
        message: error.value.message,
      };
    }

    if (data.value.numFound === 0) {
      return {
        error: true,
        message: `No book with ISBN: ${isbn} found`,
      }
    }

    return {
      title: data.value.docs[0].title, // string
      author: data.value.docs[0].author_name, // array
      yearPublished: data.value.docs[0].publish_year, // array
    };
  };

  return {
    search,
  };
}