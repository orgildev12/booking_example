'use client';
// анхны код маань 800 гаруй мөр байсан бол сайн component-жуулснаар  
// 200-хан мөр болж дахин ашиглах болон уншигдахад ч амар болсон

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Radio, Segmented } from 'antd';

import AirportSelector from './components/AirportSelector';
import ClassSelector from './components/ClassSelector';
import PassengerSelector from './components/PassengerSelector';
import DateSelector from './components/DateSelector';
import MileLoginModal from './components/MileLoginModal';
import RotateIcon from '@/assets/icons/rotate.svg';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

// Custom Hooks
import { useMileAuthentication } from './hooks/useMileAuthentication';
import useFetchAirports from './hooks/useFetchAirports';
import useSwap from './hooks/useSwap';

// Utils
import { createOnValuesChange } from './utils/formUtils';
import { postToNewTab_forNormalDirections as postToNewTab } from './utils/postToNewTab';
import { getLocationFilteredAirports, getRouteFilteredAirports } from './utils/filterAirports';
import { fixFlightDataForAmedeus } from './utils/bookingUtils';


const Flight = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const [mileForm] = Form.useForm();
  const flightRef = useRef();
  const fromSearchRef = useRef();
  const toSearchRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [isInternational, setIsInternational] = useState(true);
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { mileLoading, handleMileSubmit } = useMileAuthentication(form);
  const { airports, loading } = useFetchAirports();
  const { isSwapping, handleSwap } = useSwap(form);

  const didMountRef = useRef(false);
  const fromValue = Form.useWatch('from', form);
  const toValue = Form.useWatch('to', form);

  useEffect(() => {
    if (!isSwapping && fromValue && fromValue !== 'UBN') {
      form.setFieldValue('to', 'UBN');
    }
  }, [fromValue, airports, isSwapping]);

  useEffect(() => {
    if (!airports.length) return;

    if (isInternational) {
      form.setFieldsValue({ from: 'UBN', to: '' });
    } else if (!isInternational) {
      form.setFieldsValue({ from: 'UBN', to: '' });
    }
  }, [isInternational, airports]);

  const handleMileLogin = async (values) => {
    const success = await handleMileSubmit(values);
    if (success) {
      setModalOpen(false);
    }
  };

   const handleSubmit = (values) => {
    if (values.payment == 'miles') {
      setModalOpen(true);
    } else {
      let tmp = fixFlightDataForAmedeus(values);

      postToNewTab('https://digital.miat.com/booking?lang=mn', tmp);
    }
  };

  const handleOpenChange = (e) => {
    if (e) {
    } else {
      setSearchValue('');
    }
  };

  return (
    <div className="py-4 px-9 pb-8 rounded-xl relative" ref={flightRef}>
      <Form
        form={form}
        initialValues={{
          // type: 'Олон улс',
          payment: 'card',
          direction: 'oneway',
          segments: [{ from: '', to: '', date: null }],
          commercialFareFamilies: 'ECOREFX',
          date: dayjs().add(7, 'day'),
          passenger: {
            ADT: 1,
            CHD: 0,
            INF: 0,
          },
        }}
        onFinish={handleSubmit}
        className="flex flex-col gap-8"
        layout="vertical"
        onValuesChange={createOnValuesChange(form)}
        requiredMark={false}
      >
        <div className="flex flex-wrap gap-8 justify-center md:justify-between items-center">
          <Form.Item name="direction" className="mb-0">
            <Radio.Group
              size="large"
              options={[
                { value: 'oneway', label: t('one way') },
                { value: 'return', label: t('return') },
                { value: 'Multicity', label: t('Multicity') },
              ]}
            ></Radio.Group>
          </Form.Item>
          <Form.Item name="type" className="flex-1 mb-0">
            <Segmented
              options={[
                { label: t('International'), value: true },
                { label: t('Domestic'), value: false }
              ]}
              size="large"
              value={isInternational}
              onChange={setIsInternational}
            />
          </Form.Item>
          <Form.Item name="payment" className="mb-0">
            <Radio.Group
              size="large"
              options={[
                { value: 'card', label: t('Bank card') },
                { value: 'miles', label: t('Mile + Card') },
              ]}
            ></Radio.Group>
          </Form.Item>
        </div>
        <div className="flex gap-8 flex-wrap justify-center md:justify-start">
          <div className="flex items-center w-full justify-center md:w-fit">
            <AirportSelector
              airports={getLocationFilteredAirports(airports, isInternational)}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              popoverOpen={fromPopoverOpen}
              setPopoverOpen={setFromPopoverOpen}
              handleOpenChange={handleOpenChange}
              searchRef={fromSearchRef}
              flightRef={flightRef}
              field="from"
              label={t('From')}
            />
            <button
              type="button"
              onClick={handleSwap}
              className="-mx-3 bg-primary rounded-full w-12 h-12 flex justify-center items-center z-10 cursor-pointer transition-all text-background group hover:brightness-125"
            >
              <RotateIcon className="text-xl text-white h-6 w-6 group-hover:rotate-45 transition-all" />
            </button>
            <AirportSelector
              airports={getRouteFilteredAirports(airports, isInternational, form)}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              popoverOpen={toPopoverOpen}
              setPopoverOpen={setToPopoverOpen}
              handleOpenChange={handleOpenChange}
              searchRef={toSearchRef}
              flightRef={flightRef}
              field="to"
              label={t('To')}
            />
          </div>
          <div className="md:flex gap-8 items-end flex-1 flex-wrap grid grid-cols-1">
            <div className="flex-1">
              <DateSelector 
                getFieldValue={form.getFieldValue} 
              />
            </div>
            <div className="flex-1">
              <PassengerSelector
                getFieldValue={form.getFieldValue}
                setFieldValue={form.setFieldValue}
                flightRef={flightRef}
              />
            </div>
            <div>
              <ClassSelector
                getFieldValue={form.getFieldValue}
                setFieldValue={form.setFieldValue}
                flightRef={flightRef}
              />
            </div>
            <Form.Item label={null} className="flex justify-end self-end mb-0">
              <Button htmlType="submit" className="w-full" type="primary" size="large">
                {t('Search')}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>

      <MileLoginModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleMileLogin}
        loading={mileLoading}
        form={mileForm}
      />
    </div>
  );
}
export default Flight;
