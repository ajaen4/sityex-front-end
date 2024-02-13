export const sortListings = (listings, orderBy) => {
  const sortedHousingIndex = [...listings].sort((a, b) => {
    if (orderBy === "rank") {
      return a.rank - b.rank;
    }
    if (orderBy === "price") {
      return (
        parseFloat(a.costsFormatted.price) - parseFloat(b.costsFormatted.price)
      );
    }
  });

  return sortedHousingIndex;
};
