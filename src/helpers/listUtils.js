export const filterListings = (listings, filters, orderBy) => {
  let filteredListings = [...listings];

  if (filters.minPrice) {
    const minPrice = parseFloat(filters.minPrice);
    filteredListings = filteredListings.filter(
      (listing) => parseFloat(listing.costsFormatted.price) >= minPrice
    );
  }

  if (filters.maxPrice) {
    const maxPrice = parseFloat(filters.maxPrice);
    filteredListings = filteredListings.filter(
      (listing) => parseFloat(listing.costsFormatted.price) <= maxPrice
    );
  }

  if (filters.propertyType.length > 0) {
    const propertyType = filters.propertyType.map((type) => type.toLowerCase());
    filteredListings = filteredListings.filter((listing) =>
      propertyType.includes(listing.typeLabel)
    );
  }

  if (filters.rentType.length > 0) {
    const rentType = filters.rentType.map((type) => type.toLowerCase());
    filteredListings = filteredListings.filter((listing) =>
      rentType.includes(listing.kindLabel)
    );
  }

  if (orderBy !== "housing_id") {
    filteredListings = filteredListings.sort((a, b) => {
      if (orderBy === "rank") {
        return a.rank - b.rank;
      }
      if (orderBy === "price") {
        return a.costs.price - b.costs.price;
      }
    });
  }

  return filteredListings;
};
