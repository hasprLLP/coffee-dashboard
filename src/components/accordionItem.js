import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
import Image from "next/image";

const DrawerItem = ({ icon, name, pages, active, setter }) => {
  return (
    <AccordionItem style={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box flex="1">
                <div className="drawer-item">
                  <div className="drawer-item-row">
                    <div className="drawer-item-icon">
                      <Image alt="owner" src={`/static/svg/${icon}-${isExpanded ? "on" : "off"}.svg`} layout="fill" size="1vw" objectFit="contain" />
                    </div>
                    <h2 className={isExpanded ? "drawer-item-label-active" : "drawer-item-label"}>{name}</h2>
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
                  <Box flex="1" key={i} onClick={() => setter(page)}>
                    <div className="drawer-item">
                      <div className="drawer-item-row -left">
                        <div className="drawer-item-icon">
                          <Image
                            alt="owner"
                            src={`/static/svg/dot-${isExpanded && active === page ? "on" : "off"}.svg`}
                            layout="fill"
                            size="1vw"
                            objectFit="contain"
                          />
                        </div>
                        <h2 className={isExpanded && active === page ? "drawer-item-label-active" : "drawer-item-label"}>{page}</h2>
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
