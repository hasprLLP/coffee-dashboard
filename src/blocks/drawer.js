import Image from 'next/image';
import { Accordion } from '@chakra-ui/react';
import DrawerItem from '@/components/accordionItem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Drawer() {
  const [activePage, setActivePage] = useState(null);
  const router = useRouter();
  const [dashboard, setDashboard] = useState(false);
  const [report, setReport] = useState(false);

  const dashButton = () => {
    setDashboard(true);
    setReport(false);
  };
  const reportButton = () => {
    setDashboard(false);
    setReport(true);
  };
  // #Function to navigate to a page and pass sub pages as a query string
  const navigate = (page) => {
    setDashboard(false);
    setReport(false);
    router.push({
      pathname: page,
    });
    // Setting current active page
    setActivePage(page);
  };

  useEffect(() => {
    if (dashboard) router.replace('/');
    else if (report) router.replace('/report');
  }, [dashboard, report]);

  return (
    <div className='drawer fixed'>
      <Image alt='logo' src='/icons/logo/logo.png' layout='responsive' width='14.5vw' height='4.5vw' objectFit='contain' />
      <div className='drawer-gap' />
      <div onClick={dashButton} className='drawer-button'>
        <Image
          alt='logo'
          src={`/static/svg/dash-${dashboard ? 'on' : 'off'}.svg`}
          layout='responsive'
          width='14.5vw'
          height='4.5vw'
          objectFit='contain'
        />
      </div>
      <div onClick={reportButton} className='drawer-button'>
        <Image
          alt='logo'
          src={`/static/svg/report-${report ? 'on' : 'off'}.svg`}
          layout='responsive'
          width='14.5vw'
          height='4.5vw'
          objectFit='contain'
        />
      </div>
      <div className='drawer-gap' />
      <Accordion allowToggle>
        <DrawerItem
          icon='user'
          heading='Student'
          pages={[
            { name: 'View', path: '/passenger' },
            { name: 'Add', path: '/passenger/add' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon='bus'
          heading='Bus'
          pages={[
            { name: 'View', path: '/bus' },
            { name: 'Add', path: '/bus/add' },
            { name: 'Locate', path: '/bus/locate' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon='bus'
          heading='School'
          pages={[
            { name: 'View', path: '/school' },
            { name: 'Add', path: '/school/add' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />

        <DrawerItem
          icon='driver'
          heading='Driver'
          pages={[
            { name: 'View', path: '/driver' },
            { name: 'Add', path: '/driver/add' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon='route'
          heading='Route'
          pages={[
            { name: 'View', path: '/route' },
            { name: 'Add', path: '/route/add' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />

        <DrawerItem
          icon='user'
          heading='User'
          pages={[
            { name: 'View', path: 'profile' },
            { name: 'Add', path: 'create' },
          ]}
          active={activePage}
          setter={setActivePage}
        />
        <DrawerItem
          icon='redeem'
          heading='Redeem'
          pages={['User Profile', 'Create Driver', 'Drivers List']}
          active={activePage}
          setter={setActivePage}
        />
      </Accordion>
    </div>
  );
}
