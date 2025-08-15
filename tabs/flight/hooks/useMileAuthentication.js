import { useState } from 'react';
import instance from '@/utils/axios';
import { fixFlightDataForAmedeus } from '../utils/bookingUtils';
import { handleMileSubmitServer } from '../utils/handleMileSubmitServer';
import { postToNewTab_forNormalDirections, postToNewTab_forMulticity } from '../utils/postToNewTab';
import { parseXmlToJson_1 as parseXmlToJson} from '../utils/parseXmlToJson';

export function useMileAuthentication(form, isMulticity) {
  const [mileLoading, setMileLoading] = useState(false);

// handleMileSubmit-ыг 2 дахиж зарлаж байхаар жижиг өөр хэсгийн нь isMulticity гээр зохицуулж болно.
  const handleMileSubmit = async (values) => {
    setMileLoading(true);

    try {
      // --- Service 1 ---
      let res;
      try {
        res = await handleMileSubmitServer(values);
      } catch (err) {
        console.error("Service 1 failed:", err);
        // setError("Error occurred on service 1"); // optional UI error
        return false;
      }

      const response = parseXmlToJson(res);
      let formValues = fixFlightDataForAmedeus(form.getFieldsValue());
      formValues.lightLogin = {
        names: [
          {
            title: response.title,
            firstName: response.name,
            lastName: response.surname
          }
        ],
        frequentFlyerCard: {
          companyCode: 'OM',
          cardNumber: values.bsmnum,
          tierLevelName: ''
        },
        milesAssetBalance: [
          {
            assetType: 'Miles',
            assetValue: response.mile_balance
          }
        ],
        contacts: [
          {
            contactType: 'Email',
            address: response.email
          },
          {
            contactType: 'Phone',
            countryPhoneExtension: response.phone_int_code,
            number: response.phone_number
          }
        ],
        isPrimaryTraveler: true,
        gender: response.gender,
        dateOfBirth: response.DOB,
        passengerTypeCode: 'ADT'
      };

      if (!isMulticity) { // Multicity booking дээр энэ api-ыг дуудахгүй бас өөр postToNewTab хэрэглэдэг гэж ойлгосон.
        try {
          const res2 = await instance({
            method: 'get',
            url: `https://mws.miat.com:590/api/Products/get`,
            params: {
              ffCardNumber: values.bsmnum,
              FFCompanyCode: 'OM',
              SystemType: 'Site'
            }
          });
          formValues.privateFacts = res2.data.jweEncrypted;
        } catch (err) {
          console.error("Service 2 failed:", err);
          // setError("Error occurred on service 2"); // optional UI error
          return false;
        }
      }

      // --- Post to new tab ---
      if(isMulticity) {
        postToNewTab_forMulticity('https://digital.miat.com/booking?lang=mn', formValues);
      }
      postToNewTab_forNormalDirections('https://digital.miat.com/booking?lang=mn', formValues);

    } finally {
      setMileLoading(false);
    }
  };

  return {
    mileLoading,
    handleMileSubmit
  };
}
