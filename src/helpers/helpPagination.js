export const initialPaginationInfo = {
   page: 1,
   offset: 0,
   elementsPerPage: 10,
};

export const getTotalPages = (dataLength, elementsPerPage) =>
   Math.ceil(dataLength / elementsPerPage);

export const getOffset = (page, elementsPerPage) =>
   page * elementsPerPage - elementsPerPage;

export const getPagesRange = (totalPages) => {
   return Array.from(
      Array(totalPages > 5 ? 5 : totalPages).keys(),
      (index) => ++index
   );
};
