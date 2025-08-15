'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Flight from './tabs/flight/Flight';
import ChangeFlight from './tabs/changeFlight/ChangeFlight';
import CheckIn from './tabs/checkIn/CheckIn';
import OnlineVisa from './tabs/onlineVisa/OnlineVisa';
import * as motion from 'motion/react-client';
import PlaneIcon from '@/assets/icons/plane.svg';
import OnlineVisaIcon from '@/assets/icons/online-visa.svg';
import ChangeFlightIcon from '@/assets/icons/change-flight.svg';
import RegisterIcon from '@/assets/icons/register.svg';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';


const Booking = () => {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations();
// орчуулгуудаа бүрэн оруулаад яваарай. зарим component өөр хэлний хувилбар нь байхгүйн 
// улмаас харагдахгүй тохиолдол их байгаа.

  return (
    <motion.div
      initial={{ opacity: 0, translateY: '200px' }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
      }}
      className="mx-auto container -mt-[10vh] relative z-10 shadow-xl rounded-xl"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        <button
          onClick={() => setActiveTab(0)}
          className={twMerge(
            'flex items-center gap-2 justify-center bg-primary text-white font-bold py-3 pb-5 rounded-t-2xl cursor-pointer transition-all hover:brightness-125',
            activeTab === 0 && 'bg-white text-black'
          )}
        >
          <PlaneIcon className={twMerge('h-7 w-7', activeTab === 0 && 'text-primary')}></PlaneIcon>
          {t('flightBooking')}
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={twMerge(
            'flex items-center gap-2 justify-center bg-primary text-white font-bold py-3 pb-5 rounded-t-2xl cursor-pointer transition-all hover:brightness-125',
            activeTab === 1 && 'bg-white text-black'
          )}
        >
          <ChangeFlightIcon
            className={twMerge('h-7 w-7', activeTab === 1 && 'text-primary')}
          ></ChangeFlightIcon>
          {t('changeBooking')}
        </button>
        <button
          onClick={() =>
            window.open(`https://digital.miat.com/ssci/identification?lang=mn-MN`, '_blank').focus()
          }
          className={twMerge(
            'flex items-center gap-2 justify-center bg-primary text-white font-bold py-3 pb-5 rounded-t-2xl cursor-pointer transition-all hover:brightness-125',
            activeTab === 2 && 'bg-white text-black'
          )}
        >
          <RegisterIcon
            className={twMerge('h-7 w-7', activeTab === 2 && 'text-primary')}
          ></RegisterIcon>
          {t('checkIn')}
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={twMerge(
            'flex items-center gap-2 justify-center bg-primary text-white font-bold py-3 pb-5 rounded-t-2xl cursor-pointer transition-all hover:brightness-125',
            activeTab === 3 && 'bg-white text-black'
          )}
        >
          <OnlineVisaIcon
            className={twMerge('h-7 w-7', activeTab === 3 && 'text-primary')}
          ></OnlineVisaIcon>
          {t('onlineVisa')}
        </button>
      </div>
      <div className="-mt-3 relative z-10 rounded-xl overflow-hidden bg-white">
        {activeTab === 0 ? (
          <Flight></Flight>
        ) : activeTab === 1 ? (
          <ChangeFlight></ChangeFlight>
        ) : activeTab === 2 ? (
          <CheckIn></CheckIn>
        ) : (
          <OnlineVisa></OnlineVisa>
        )}
      </div>
    </motion.div>
  );
};

export default Booking;
