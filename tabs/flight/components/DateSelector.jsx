import { Form, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';

const { RangePicker } = DatePicker;

const DateSelector = ({ getFieldValue }) => {
  const t = useTranslations();
  return (
    <Form.Item
      className="mb-0 w-full lg:w-72 xl:w-full"
      shouldUpdate={(prev, curr) => prev.direction !== curr.direction}
    >
      {() => {
        const direction = getFieldValue('direction');
        return (
          <Form.Item
            name="date"
            label={
              direction === 'oneway'
                ? <div className="text-xs text-main/60">{t('Departure')}</div>
                : <div className="text-xs text-main/60">{t('Departure - Return')}</div>
            }
            className="mb-0"
            rules={[{ required: true, message: t('Please select a date') }]}
          >
            {direction === 'return' ? (
              <RangePicker
                size="large"
                className="w-full rounded-lg"
                suffixIcon={<CalendarOutlined />}
              />
            ) : (
              <DatePicker size="large" className="w-full rounded-lg" />
            )}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

export default DateSelector;
