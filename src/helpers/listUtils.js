export const sortListings = (listings, sortBy) => {
  const sortedHousingIndex = [...listings].sort((a, b) => {
    if (sortBy === "rank") {
      return a.rank - b.rank;
    }
    if (sortBy === "price") {
      return (
        parseFloat(a.costsFormatted.price) - parseFloat(b.costsFormatted.price)
      );
    }
  });

  return sortedHousingIndex;
};
