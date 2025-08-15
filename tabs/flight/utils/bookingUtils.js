
// Single Responsibility Principle хэрэглэх
// Жишээ нь энэ fixFlightDataForAmedeus нь digital.miat луу явдаг бүх хүсэлтийг handle хийж чаддаг мөртлөө
// өөрөө тус тусын үүрэгтэй жижиг функцуудыг дотроо ашигладаг болохоор өөрчлөлт хийх эсвэл debug хийвэл 
// зөвхөн тэр жижиг function-тойгоо л ажиллаж болно.

// Format a date safely
function formatDate(date) {
  return date && typeof date.format === 'function' ? date.format('YYYY-MM-DD') : '';
}

// Generate travelers array based on passenger counts
function getTravelers(passenger = { ADT: 1, CHD: 0, INF: 0 }) {
  return [
    ...Array(passenger.ADT).fill({ passengerTypeCode: 'ADT' }),
    ...Array(passenger.CHD).fill({ passengerTypeCode: 'CHD' }),
    ...Array(passenger.INF).fill({ passengerTypeCode: 'INF' }),
  ];
}

// Prepare itineraries for multicity trips
function getMulticityItineraries(segments = []) {
  return segments
    .filter(seg => seg.from && seg.to && seg.date && typeof seg.date.format === 'function')
    .map(seg => ({
      originLocationCode: seg.from,
      destinationLocationCode: seg.to,
      departureDateTime: formatDate(seg.date),
    }));
}

// Prepare itineraries for oneway or return trips
function getSimpleItineraries({ direction, from, to, date }) {
  const isDateArray = Array.isArray(date);
  const firstDate = direction === 'oneway'
    ? formatDate(date)
    : isDateArray
      ? formatDate(date[0])
      : formatDate(date);

  const itineraries = [
    {
      originLocationCode: from,
      destinationLocationCode: to,
      departureDateTime: firstDate,
    },
  ];

  if (direction === 'return' && isDateArray && date[1]) {
    itineraries.push({
      originLocationCode: to,
      destinationLocationCode: from,
      departureDateTime: formatDate(date[1]),
    });
  }

  return itineraries;
}

// Ensure commercial fare families is always an array
function getFareFamilies(families) {
  if (Array.isArray(families)) return families;
  if (families) return [families];
  return ['ECOREFX', 'BIZREFX'];
}

// Main function
export function fixFlightDataForAmedeus(_data) {
  const travelers = getTravelers(_data.passenger);

  const itineraries =
    _data.direction === 'multicity' && Array.isArray(_data.segments)
      ? getMulticityItineraries(_data.segments)
      : getSimpleItineraries(_data);

  const commercialFareFamilies = getFareFamilies(_data.commercialFareFamilies);

  return {
    search: {
      travelers,
      commercialFareFamilies,
      itineraries,
    },
    portalFacts: `[{"key":"officeID","value":"UBNOM08AA"}]`,
  };
}
