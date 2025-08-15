import { Form, Input, Popover } from 'antd';
import Highlighter from 'react-highlight-words';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';

// [locale] ын хэсэг дээр яг энэ component оо дахин ашиглаж болно.

const AirportSelector = ({
  airports,
  searchValue,
  setSearchValue,
  popoverOpen,
  setPopoverOpen,
  handleOpenChange,
  searchRef,
  flightRef,
  field,
  label,
}) => {
  const t = useTranslations();

  const onOpenChange = (e) => {
    setPopoverOpen(e);
    handleOpenChange(e, field);
    if (e) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const foundAirport = airports.find(
        (airport) =>
          airport.value.toLowerCase() === searchValue.toLowerCase() ||
          airport.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          airport.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (foundAirport) {
        setFieldValue(field, foundAirport.value);
        setPopoverOpen(false);
      }
    }
  };
  return (
    <Form.Item className="w-36 mb-0" shouldUpdate={(prev, next) => prev[field] !== next[field]}>
      {({ getFieldValue, setFieldValue }) => (
        <Form.Item name={field} className="mb-0">
          <Popover
            open={popoverOpen}
            onOpenChange={onOpenChange}
            trigger={'click'}
            arrow={false}
            placement="bottomLeft"
            classNames={{ body: 'p-0 rounded-xl shadow-2xl bg-background' }}
            content={
              <div className="p-8 text-main">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-3 items-center">
                    <div className="font-bold text-2xl">{label}</div>
                  </div>
                  <Input
                    ref={searchRef}
                    placeholder={t('searchAirport')}
                    onKeyDown={onKeyDown}
                    value={searchValue}
                    size="large"
                    onChange={(e) => setSearchValue(e.target.value)}
                  ></Input>
                  <div className="flex flex-col gap-1 min-w-md max-h-[50vh] overflow-y-auto">
                    {airports
                      .filter(
                        (foo) =>
                          foo.value.includes(searchValue.toLowerCase()) ||
                          foo.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                          foo.title.includes(searchValue.toLowerCase())
                      )
                      .map((foo, fooIndex) => (
                        <div
                          key={`${searchValue.id}-${fooIndex}`}
                          onClick={() => {
                            setFieldValue(field, foo.value);
                            setPopoverOpen(false);
                          }}
                          className="border p-4 border-foreground/10 rounded-2xl hover:border-primary transition-all cursor-pointer"
                        >
                          <Highlighter
                            searchWords={searchValue.split(' ')}
                            autoEscape={true}
                            textToHighlight={foo.label}
                          ></Highlighter>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            }
          >
          {(() => {
            const selectedValue = getFieldValue(field);
            const selected = airports.find((a) => a.value === selectedValue);
            const placeholder = Array.isArray(field)
              ? field[field.length - 1] === 'from'
                ? 'From'
                : 'To'
              : field === 'from'
                ? 'From'
                : 'To';
            const placeholderTitle = Array.isArray(field)
              ? field[field.length - 1] === 'from'
                ? 'Departing From '
                : 'Arrived at'
              : field === 'from'
                ? 'Departing From '
                : 'Arrived At';
            const hasValue = Boolean(selected?.value);
            const hasTitleValue = Boolean(selected?.title);
            const displayText = hasValue ? selected.value : placeholder;
            const displayTitleText = hasTitleValue ? selected.title : placeholderTitle;
            const textColorClass = hasValue ? 'text-main/60' : 'text-gray-300';
            return (
              <div
                className="h-full bg-gray-100 border border-transparent rounded-lg p-2 cursor-pointer hover:border-primary flex flex-col items-center"
                onClick={() => {
                  window.scrollTo({
                    behavior: 'smooth',
                    top:
                      flightRef.current.getBoundingClientRect().top + window.scrollY - 200,
                    left: 0,
                  });
                }}
              >
                <span className={`font-bold ${textColorClass} text-xl sm:text-3xl`}>{displayText}</span>
                <span className={`font-normal ${textColorClass} text-xs sm:text-sm`}>
                  {displayTitleText}
                </span>
              </div>
            );
          })()}
        </Popover>
      </Form.Item>
    )}
  </Form.Item>
);}

export default AirportSelector;
