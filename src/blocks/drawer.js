import Image from 'next/image';
import { Accordion } from '@chakra-ui/react';
import DrawerItem from '@/components/accordionItem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Drawer() {
  const [activePage, setActivePage] = useState(null);
  const router = useRouter();
  // #Function to navigate to a page and pass sub pages as a query string
  const navigate = (page) => {
    router.push({
      pathname: page,
    });
    // Setting current active page
    setActivePage(page);
  };
  return (
    <div className='drawer fixed'>
      <Image alt='logo' src='/static/svg/logo.svg' layout='responsive' width='14.5vw' height='4.5vw' objectFit='contain' />
      <div className='drawer-gap' />
      <Image alt='logo' src='/static/svg/dash-off.svg' layout='responsive' width='14.5vw' height='4.5vw' objectFit='contain' />
      <Image alt='logo' src='/static/svg/report-off.svg' layout='responsive' width='14.5vw' height='4.5vw' objectFit='contain' />
      <div className='drawer-gap' />
      <Accordion allowToggle>
        <DrawerItem
          icon='bus'
          heading='Bus'
          pages={[
            { name: 'View', path: '/bus' },
            { name: 'Add Buses', path: '/bus/add' },
            { name: 'Locate', path: '/bus/locate' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />

        <DrawerItem
          icon='driver'
          heading='Driver'
          pages={[
            { name: 'User Profile', path: 'profile' },
            { name: 'Create Driver', path: 'create' },
            { name: 'Drivers List', path: 'list' },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem icon='route' heading='Route' pages={['Bus Profile', 'Create Bus', 'Bus List']} active={activePage} setter={setActivePage} />

        <DrawerItem icon='user' heading='User' pages={['User Profile', 'Create Driver', 'Drivers List']} active={activePage} setter={setActivePage} />
        <DrawerItem
          icon='redeem'
          heading='Redeem'
          pages={['User Profile', 'Create Driver', 'Drivers List']}
          active={activePage}
          setter={setActivePage}
        />
        <DrawerItem
          icon='owner'
          heading='Owner'
          pages={['User Profile', 'Create Driver', 'Drivers List']}
          active={activePage}
          setter={setActivePage}
        />
      </Accordion>
    </div>
  );
}
