'use client';
import instance from '@/utils/axios';
import { Button, Form, Select } from 'antd';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const robotoFont = Roboto({
  weight: ['700', '500', '400'],
  subsets: ['cyrillic'],
});

const OnlineVisa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance({
      method: 'get',
      url: `https://restcountries.com/v3.1/all?fields=name,flags`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 pb-8 rounded-xl">
      <Form
        className="flex gap-3 items-center"
        layout="vertical"
        onFinish={() => window.open(`https://evisa.mn/en/apply`, '_blank').focus()}
      >
        <Form.Item
          label={<div className={twMerge('font-medium text-foreground')}>Аялах улс</div>}
          name="country"
          className="mb-0 flex-1"
          rules={[
            {
              required: true,
              message: 'Аялах улс заавал сонгоно уу!',
            },
          ]}
          extra="Виз мэдүүлэх улсыг сонгоно уу"
        >
          <Select
            loading={loading}
            variant="underlined"
            className="w-full"
            size="large"
            placeholder="Улс сонгох"
            showSearch
            filterOption={(input, option) => {
              var _a;
              return (
                (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                _a !== void 0
                  ? _a
                  : ''
              )
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
            optionRender={(option) => {
              return (
                <div className="flex items-center gap-3">
                  <Image
                    alt="country flag"
                    role="image"
                    src={option.data.flags.png}
                    height={16}
                    width={16}
                  />
                  <span>{option.data.label}</span>
                </div>
              );
            }}
            options={data.map((foo) => ({
              value: foo.name.official,
              label: foo.name.official,
              ...foo,
            }))}
          ></Select>
        </Form.Item>
        <Form.Item noStyle label={null}>
          <Button type="primary" size="large" htmlType="submit">
            Виз мэдүүлэх
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OnlineVisa;
