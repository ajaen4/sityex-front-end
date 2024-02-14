export const filterListings = (listings, filters, orderBy) => {
  const filteredListings = listings.filter((listing) => {
    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
    const furnitureValue = filters.furniture === "furnished" ? "yes" : "no";
    const totalSize = filters.totalSize ? parseFloat(filters.totalSize) : null;

    // Price criteria
    if (
      minPrice !== null &&
      parseFloat(listing.costsFormatted.price) < minPrice
    )
      return false;
    if (
      maxPrice !== null &&
      parseFloat(listing.costsFormatted.price) > maxPrice
    )
      return false;

    // Furniture criteria
    if (
      filters.furniture &&
      ((listing.facilities.roomFurniture !== undefined &&
        listing.facilities.roomFurniture.value !== furnitureValue) ||
        (listing.facilities.bedroomFurnished !== undefined &&
          listing.facilities.bedroomFurnished.value !== furnitureValue))
    ) {
      return false;
    }

    // Total size criteria
    if (
      totalSize !== null &&
      parseFloat(listing.facilities.totalSize?.value) < totalSize
    )
      return false;

    // Property type criteria
    if (
      filters.propertyType.length > 0 &&
      !filters.propertyType.includes(listing.typeLabel)
    )
      return false;

    // Rent type criteria
    if (
      filters.rentType.length > 0 &&
      !filters.rentType.includes(listing.kindLabel)
    )
      return false;

    // Amenities criteria
    if (
      filters.amenities.length > 0 &&
      !amenitiesFilter(listing, filters.amenities)
    )
      return false;

    // Facilities criteria
    if (
      filters.facilities.length > 0 &&
      !facilitiesFilter(listing, filters.facilities)
    )
      return false;

    // If none of the conditions returned false, the listing meets all criteria
    return true;
  });

  return orderByListings(filteredListings, orderBy);
};

const facilitiesFilter = (listing, facilities) => {
  return facilities.every(
    (facility) =>
      listing.facilities[facility] &&
      ((facility === "bathroom" &&
        listing.facilities[facility].value === "private") ||
        (facility !== "bathroom" &&
          listing.facilities[facility].value !== "no"))
  );
};

const amenitiesFilter = (listing, amenities) => {
  return amenities.every(
    (amenity) =>
      listing.facilities[amenity] && listing.facilities[amenity].value !== "no"
  );
};

const orderByListings = (listings, orderBy) => {
  if (!orderBy) {
    return listings;
  }

  return listings.sort((a, b) => {
    if (orderBy === "rank") {
      return a.rank - b.rank;
    }
    if (orderBy === "low-price") {
      return (
        parseFloat(a.costsFormatted.price) - parseFloat(b.costsFormatted.price)
      );
    }
    if (orderBy === "high-price") {
      return (
        parseFloat(b.costsFormatted.price) - parseFloat(a.costsFormatted.price)
      );
    }
  });
};
