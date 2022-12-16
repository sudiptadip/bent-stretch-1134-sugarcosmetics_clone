import React from "react";
import styles from "./styles.module.css";
import {
    Box,
    Flex,
     Text
    } from "@chakra-ui/react";
  
  import {
   
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
  
  } from "@chakra-ui/react";
  import { AiFillCloseCircle } from "react-icons/ai";

const SortingFiltering = ({ sort, setSort, cats, filterCat, setFilterCat }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
        const state = [...filterCat, input.value];
        setFilterCat(state);
    } else {
        const state = filterCat.filter((val) => val !== input.value);
        setFilterCat(state);
    }
};



  return (
    <div>
      
      <Flex flexDirection={{ lg: "row", md: "column", sm: "column" }}>
        <Box
          display="flex"
          flexDirection="column"
          w={{ lg: "25%", md: "35%", sm: "50%" }}
          h="min-content"
          m="15px"
          gap="10px"
        >
          <Box>
           

            <Accordion
              defaultIndex={[0]}
              allowMultiple
              bg={"white"}
              width="80%"
              margin={"auto"}
              borderRadius={"10"}
            >
              <AccordionItem isFocusable="false">
                <h2>
                  <AccordionButton
                    _hover={{ background: "white", borderRadius: "10" }}
                  >
                    <Box flex="1" fontWeight={"bold"} textAlign="left">
                      Sort By: Relevance
                    </Box>
                    <Text marginRight={"10px"}>
                      <AiFillCloseCircle />
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel textAlign={"left"} display="block">
                <select
                    onChange={onSelectChange}
                    className={styles.select}
                    defaultValue={sort.sort}
                  >
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                  </select>
                  <button className={styles.arrow_btn} onClick={onArrowChange}>
                    <p className={styles.up_arrow}>&uarr;</p>
                    <p className={styles.down_arrow}>&darr;</p>
                  </button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box>
           
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              bg={"white"}
              width="80%"
              margin={"auto"}
              borderRadius={"10"}
            >
              <AccordionItem isFocusable="false" border="none">
                <h2>
                  <AccordionButton
                    _hover={{ background: "white", borderRadius: "10" }}
                    gap={5}
                  >
                    <Box flex="1" fontWeight={"bold"} textAlign="left">
                      Filters
                    </Box>
                    {/* <Text
                      fontSize={"15px"}
                      color={"red"}
                      onClick={resetCheckBox}
                    >
                      Reset
                    </Text> */}
                  </AccordionButton>
                </h2>
              </AccordionItem>

              <AccordionItem isFocusable="false">
                <h2>
                  <AccordionButton
                    _hover={{ background: "white", borderRadius: "10" }}
                  >
                    <Box flex="1" fontWeight={"bold"} textAlign="left">
                      Product Type
                    </Box>
                    {/* <Text
                      marginRight={"13px"}
                      fontSize={"10px"}
                      color={"red"}
                      onClick={resetCheckBox}
                    >
                      Clear All
                    </Text> */}
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel textAlign={"left"} display="block">
                {/* {cats.map((cat) => (
					<div className={styles.cat} key={cat}>
						<input
							className={styles.cat_input}
							type="checkbox"
							value={cat}
							onChange={onChange}
						/>
						<p className={styles.cat_label}>{cat}</p>
					</div>
				))} */}
                  <br />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default SortingFiltering;
