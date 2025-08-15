import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export function createOnValuesChange(form) {
  const router = useRouter();
  // Ингэж бичвэл else if гэж олон давтах шаардлагагүй болох ба
  // 1. уншигдахуйц болно.
  // 2. if else nesting нь кодыг мэдэгдэхгүйц удаан болгодог.
  
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