// Олон улс эсвэл орон нутгийн нисэх буудлуудыг шүүх функц

export function getLocationFilteredAirports(airportsList, isInternational) {
  return airportsList.filter(
    (airport) =>
      airport.value === 'UBN' ||
      (isInternational
        ? airport.country_code && airport.country_code !== 'MN'
        : airport.country_code === 'MN')
  );
}

export function getRouteFilteredAirports(airportsList, isInternational, form) {
  const locationFilteredAirports = getLocationFilteredAirports(airportsList, isInternational);
  const fromValue = form.getFieldValue('from');
  const fromAirport = airportsList.find((a) => a.value === fromValue);
  const connectedAirportCodes = fromAirport?.connected_airports ?? [];

  if (fromValue === 'UBN') {
    return locationFilteredAirports.filter(a => a.value !== 'UBN');
  }

  if (connectedAirportCodes.length > 0) {
    return airportsList.filter(
      (a) => connectedAirportCodes.includes(a.value) && a.value !== fromValue
    );
  }

  return locationFilteredAirports.filter(a => a.value !== fromValue);
}
