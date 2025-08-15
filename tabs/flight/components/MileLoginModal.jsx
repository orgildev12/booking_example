'use client';

import React from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useTranslations } from 'next-intl';

export default function MileLoginModal({ 
  open, 
  onCancel, 
  onSubmit, 
  loading, 
  form 
}) {
  const t = useTranslations();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={false}
      maskClosable={true}
      closable={loading}
    >
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">BLUE SKY MONGOLIA</div>
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onSubmit}
        >
          <Form.Item name="bsmnum" label={t('Membership number')}>
            <Input placeholder={t('Enter membership number')} />
          </Form.Item>
          <Form.Item name="bsmpass" label={t('Password')}>
            <Input.Password placeholder={t('Enter password')} />
          </Form.Item>
          <Form.Item name="mileClass" label={t('Class type')}>
            <Radio.Group>
              <Radio value={'ECOREFX'}>{t('Economy class')}</Radio>
              <Radio value={'BIZREFX'}>{t('Business class')}</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="flex justify-center items-center mb-4 gap-2">
            <div className="text-sm">
              <a
                href="https://blueskymongolia.frequentflyer.aero/pub/#/main/not-authenticated/forgotPassword"
                target="_blank"
                className="font-semibold text-primary hover:brightness-125 transition-all"
              >
                {t('Reset password')}
              </a>
            </div>
            <span> {t('or')} </span>
            <div className="text-sm">
              <a
                href="https://blueskymongolia.frequentflyer.aero/pub/#/main/not-authenticated/forgotFFId"
                target="_blank"
                className="font-semibold text-primary hover:brightness-125 transition-all"
              >
                {t('Know your membership number')}
              </a>
            </div>
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full"
            loading={loading}
          >
            {t('Continue booking')}
          </Button>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {t('Want to become a member?')}
            <a
              href="https://blueskymongolia.frequentflyer.aero/pub/#/main/not-authenticated/enrollment"
              target="_blank"
              className="font-semibold text-primary hover:brightness-125 transition-all"
            >
              {' '}{t('Register')}
            </a>
          </p>
        </Form>
      </div>
    </Modal>
  );
}
