import { Form, Popover, Radio, Button } from 'antd';
import { twMerge } from 'tailwind-merge';
import SeatIcon from '@/assets/icons/seat.svg';
import { useTranslations } from 'next-intl';

const ClassSelector = ({
  getFieldValue,
  setFieldValue,
  flightRef,
}) => {
  const t = useTranslations();
  return (
    <Form.Item
      className="mb-0"
      shouldUpdate={(prev, next) => prev.commercialFareFamilies !== next.commercialFareFamilies}
      label={<div className={twMerge('text-xs text-main/60')}>{t('Class type')}</div>}
    >
      {() => (
        <Form.Item name="commercialFareFamilies" className="mb-0">
          <Popover
            arrow={false}
            trigger={'click'}
            placement="bottom"
            classNames={{
              body: 'p-0 rounded-xl shadow-2xl bg-background',
            }}
            content={
              <div className="p-8 max-w-80 text-main">
                <div className="flex flex-col gap-6">
                  <Radio.Group
                    value={getFieldValue('commercialFareFamilies')}
                    onChange={(e) => {
                      setFieldValue(['commercialFareFamilies'], e.target.value);
                    }}
                    className="flex flex-col gap-3"
                    size="large"
                  >
                    <Radio value={'ECOREFX'}>{t('Economy class')}</Radio>
                    <Radio value={'BIZREFX'}>{t('Business class')}</Radio>
                  </Radio.Group>
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
              <SeatIcon className="h-6 w-6"></SeatIcon>
              {getFieldValue('commercialFareFamilies') === 'ECOREFX'
                ? t('Economy class')
                : t('Business class')}
            </Button>
          </Popover>
        </Form.Item>
      )}
    </Form.Item>
  );
};

export default ClassSelector;
