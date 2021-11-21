import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import Image from 'next/image';

const DrawerItem = ({ icon, heading, pages, active, setter, fun }) => {
  return (
    <AccordionItem style={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box flex='1'>
                <div className='drawer-item'>
                  <div className='drawer-item-row'>
                    <div className='drawer-item-icon'>
                      <Image alt='owner' src={`/static/svg/${icon}-${isExpanded ? 'on' : 'off'}.svg`} layout='fill' size='1vw' objectFit='contain' />
                    </div>
                    <h2 className={isExpanded ? 'drawer-item-label-active' : 'drawer-item-label'}>{heading}</h2>
                  </div>
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {pages &&
              pages.map((page, i) => {
                return (
                  <Box
                    flex='1'
                    key={i}
                    onClick={() => {
                      setter(page.name);
                      fun(page.path);
                    }}
                  >
                    <div className='drawer-item'>
                      <div className='drawer-item-row -left'>
                        <div className='drawer-item-icon'>
                          <Image
                            alt='owner'
                            src={`/static/svg/dot-${isExpanded && active === page.path ? 'on' : 'off'}.svg`}
                            layout='fill'
                            size='1vw'
                            objectFit='contain'
                          />
                        </div>
                        <h2 className={isExpanded && active === page.path ? 'drawer-item-label-active' : 'drawer-item-label'}>{page.name}</h2>
                      </div>
                    </div>
                  </Box>
                );
              })}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default DrawerItem;
