import { useEffect, useState } from 'react';
import instance from '@/utils/axios';
import { useLocale } from 'next-intl';

// country_code болон connected_airports-г airport object-д нэмснээр шүүлт хийх боломжтой болно.

export default function useFetchAirports() {
  const locale = useLocale();
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    instance
      .get(`master/tblairport_names?language=${locale}`)
      .then((res) => {
        setAirports(
          res.data.map((a) => ({
            value: a.airport_code,
            label: `${a.city_name} (${a.airport_code}), ${a.country_name}`,
            title: a.country_name,
            country_code: a.tblairport?.country_code ?? a.country_code ?? null,
            connected_airports: a.tblairport?.connected_airport
              ? a.tblairport.connected_airport.split(',').map(code => code.trim())
              : []
          }))
        );
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [locale]);

  return { airports, loading };
}
