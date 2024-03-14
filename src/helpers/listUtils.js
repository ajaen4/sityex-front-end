import { eventCategories } from "constants/constants";

export const filterListings = (listings, filters, orderBy) => {
  const filteredListings = listings.filter((listing) => {
    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
    const totalSize = filters.totalSize ? parseFloat(filters.totalSize) : null;
    const isUniplaces = listing.partner === "uniplaces";

    // Price criteria
    if (minPrice && parseFloat(listing.costsFormatted.price) < minPrice)
      return false;
    if (maxPrice && parseFloat(listing.costsFormatted.price) > maxPrice)
      return false;

    // Furniture criteria
    if (
      filters.furniture &&
      ((filters.furniture === "furnished" && !listing.isFurnished) ||
        (filters.furniture === "unfurnished" && listing.isFurnished))
    ) {
      return false;
    }

    // Total size criteria
    if (
      totalSize &&
      (isUniplaces || parseFloat(listing.facilities.totalSize) < totalSize)
    )
      return false;

    // Bedrooms criteria
    const listingBedrooms = parseInt(listing.facilities.bedrooms);
    if (
      (filters.bedrooms &&
        listingBedrooms &&
        ((filters.bedrooms < 4 && listingBedrooms !== filters.bedrooms) ||
          (filters.bedrooms === 4 && listingBedrooms < filters.bedrooms))) ||
      (filters.bedrooms && !listingBedrooms)
    )
      return false;

    if (filters.partner && listing.partner !== filters.partner) return false;

    // Property type criteria
    if (
      filters.propertyType.length > 0 &&
      (isUniplaces || !filters.propertyType.includes(listing.typeLabel))
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
      (isUniplaces || !amenitiesFilter(listing, filters.amenities))
    )
      return false;

    // Facilities criteria
    if (
      filters.facilities.length > 0 &&
      (isUniplaces || !facilitiesFilter(listing, filters.facilities))
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
        listing.facilities[facility] === "private") ||
        (facility !== "bathroom" && listing.facilities[facility] !== "no")),
  );
};

const amenitiesFilter = (listing, amenities) => {
  return amenities.every(
    (amenity) =>
      listing.facilities[amenity] && listing.facilities[amenity] !== "no",
  );
};

export const orderByListings = (listings, orderBy) => {
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
