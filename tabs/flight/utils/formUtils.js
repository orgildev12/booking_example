import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export function createOnValuesChange(form) {
  const router = useRouter();
  
  return (changedValues, allValues) => {
    if (!Object.prototype.hasOwnProperty.call(changedValues, 'direction')) {
      return;
    }

    if (allValues.direction === 'oneway') {
      form.setFieldsValue({ date: dayjs().add(7, 'day') });
      return;
    }

    if (allValues.direction === 'return') {
      form.setFieldValue('date', [dayjs(), dayjs().add(7, 'day')]);
      return;
    }

    if (changedValues.direction === 'Multicity') {
      router.push('/booking/search');
      return;
    }

    form.setFieldsValue({ date: [dayjs(), dayjs().add(7, 'day')] });
  };
}