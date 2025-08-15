import React, { useState, useEffect } from 'react';
import { Form, Popover, Button } from 'antd';
import { twMerge } from 'tailwind-merge';
import UserIcon from '@/assets/icons/user.svg';
import { useTranslations } from 'next-intl';


const Counter = ({ setFieldValue, type }) => {
  const [count, setCount] = useState(type === 'ADT' ? 1 : 0);
  const form = Form.useFormInstance();

  useEffect(() => {
    setFieldValue(['passenger', type], count);
  }, [count]);

  return (
    <div className="flex items-center gap-2">
      <Button size="middle" shape="circle" onClick={() => count - 1 !== -1 && setCount(count - 1)}>
        -
      </Button>
      <span className={twMerge('font-semibold')}>{count}</span>
      <Button size="middle" shape="circle" onClick={() => setCount(count + 1)}>
        +
      </Button>
    </div>
  );
};

const PassengerSelector = ({ getFieldValue, setFieldValue, flightRef }) => {
  const t = useTranslations();
  return (
    <Form.Item
      className="mb-0"
      shouldUpdate={(prev, next) => prev.passenger !== next.passenger}
      label={<div className={twMerge('text-xs text-main/60')}>{t('Passenger')}</div>}
    >
      {() => (
        <Form.Item name="passenger" className="mb-0">
          <Popover
            arrow={false}
            trigger={'click'}
            placement="bottom"
            classNames={{
              body: 'p-0 rounded-xl shadow-2xl bg-background',
            }}
            content={
              <div className="p-8 max-w-80 text-main">
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <div className="text-base font-semibold">{t('Adult')}</div>
                      <div className="text-main/60 text-xs">{t('12+ years')}</div>
                    </div>
                    <Counter type="ADT" setFieldValue={setFieldValue} />
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <div className="text-base font-semibold">{t('Child')}</div>
                      <div className="text-main/60 text-xs">{t('2-12 years')}</div>
                    </div>
                    <Counter type="CHD" setFieldValue={setFieldValue} />
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <div className="text-base font-semibold">{t('Infant')}</div>
                      <div className="text-main/60 text-xs">{t('Under 2 years')}</div>
                    </div>
                    <Counter type="INF" setFieldValue={setFieldValue} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-xs text-main ">
                  <p className="font-semibold">
                    {t('Instructions_for_children')}
                  </p>
                  <p className="text-main/60">
                    {t('A_childs_age')}
                  </p>
                  <p className="text-main/60">
                    {t('An_infants_age')}
                  </p>
                  <p className="text-main/60">
                    {t('An_infant_must_be')}
                  </p>
                  <p className="text-main/60">
                    {t('An_infant_must_travel')}
                  </p>
                </div>
              </div>
            }
          >
            <Button
              size="large"
              className="w-full"
              onClick={() => {
                window.scrollTo({
                  behavior: 'smooth',
                  top:
                    flightRef.current.getBoundingClientRect().top + window.scrollY - 200,
                  left: 0,
                });
              }}
            >
              <UserIcon className="h-6 w-6" />
              {getFieldValue(['passenger', 'ADT']) || 1} {t('Adult')},{' '}
              {getFieldValue(['passenger', 'CHD']) || 0} {t('Child')},{' '}
              {getFieldValue(['passenger', 'INF']) || 0} {t('Infant')}
            </Button>
          </Popover>
        </Form.Item>
      )}
    </Form.Item>
  );
};

export default PassengerSelector;
