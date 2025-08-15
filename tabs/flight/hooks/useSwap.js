import { useState } from 'react';

export default function useSwap(form) {
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    const fromVal = form.getFieldValue('from');
    const toVal = form.getFieldValue('to');
    form.setFieldsValue({ from: toVal, to: fromVal });
    setTimeout(() => setIsSwapping(false), 0);
  };

  return { isSwapping, handleSwap };
}
