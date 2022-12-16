import {
  Box,
  Flex,
  GridItem,
  Grid,
  Text,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  MenuList,
  MenuItemOption,
  Button,
  Menu,
  MenuButton,
  Checkbox,
  CheckboxGroup,
  Accordion,
  RadioGroup,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Radio,
} from "@chakra-ui/react";
import ProductBox from "../Components/ProductBox/ProductBox";

function Skincare() {
  const breakpoints = {
    lg: "1024",
    md: "786",
    sm: "480",
  };
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("");
  const [prod, setProd] = useState("");
  async function getData(url) {
    try {
      var res = await fetch(url);
      var res2 = await res.json();
      setData(res2.data.products);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let url = "https://scserver.onrender.com/api/products";
    getData(url);
  }, [order, prod]);

  function setValue(e) {
    if (e.target.value === "1") {
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    console.log(data, "data");
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      newArr.push(data[i]);
    }
    setData([...newArr]);
  }

  function resetCheckBox() {
    setCheckedItems([false, false, false, false, false]);
    setCheckBox();
  }

  function setCheckBox() {
    let url = "https://scserver.onrender.com/api/products/cat";
    let key = "?cat=";
    if (checkedItems[0] == true) {
      key += "makeup,";
    }
    if (checkedItems[1] == true) {
      key += "Lips,";
    }

    if (checkedItems[2] == true) {
      key += "Face,";
    }
    if (checkedItems[3] == true) {
      key += "brushes,";
    }
    if (checkedItems[4] == true) {
      key += "eye";
    }
    if (key !== "?cat=") url += key;
    console.log(url, "urls");
    getData(url);
    shuffleArray(data);
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(data[i]);
    }
    setData(arr);
  }
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  return (
    <div>
      <Flex bg="white" h="50px" alignItems="center">
        <Box ml="30px" mr="15px">
          <Link to="/">Home</Link>
        </Box>
        <MdKeyboardArrowRight />
        <Box ml="15px" fontWeight="600">
          Skincare
        </Box>
        <Spacer />
      </Flex>
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
            {/* <Menu matchWidth='true'>
              <MenuButton as={Button} bg='white' w='80%' >
                <Flex >
                  <Flex justifyContent='flex-start' gap='10px' >
                    <Text>Sort By:</Text>
                    <Text>Relevance</Text>
                  </Flex>
                  <Box m='auto' ml='35px'  ><GoChevronDown /></Box>
                </Flex>

              </MenuButton>
              <MenuList>
                <MenuItemOption onClick={() => changeUrlOrder("")} >Relevance</MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("asc")}>Price:Low To High</MenuItemOption>
                <MenuItemOption onClick={() => changeUrlOrder("desc")}>Price:Hight To Low</MenuItemOption>
              </MenuList>
            </Menu> */}

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
                  {/* <RadioGroup onChange={setValue} value={value}> */}
                  <RadioGroup>
                    <Stack direction="column">
                      <Radio onChange={(e) => setValue(e)} value="1">
                        Low to Hight
                      </Radio>
                      <Radio onChange={(e) => setValue(e)} value="2">
                        Hight to Low
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box>
            {/* <Menu matchWidth='true'>
              <MenuButton as={Button} bg='white' w='80%' >
                <Flex >
                  <Flex justifyContent='flex-start' gap='10px' >
                    <Text>Filter By:</Text>
                    <Text>Product Type</Text>
                  </Flex>
                  <Box m='auto'  ><GoChevronDown /></Box>

                </Flex>

              </MenuButton>
              <MenuList > */}

            {/* <MenuItemOption onClick={() => changeUrlType("mask")}>Face Mask</MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("acne")}>Acne Care </MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("moisturizer")}>Face Cream</MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("serum")}>Face Serum</MenuItemOption>
                <MenuItemOption onClick={() => changeUrlType("")}>Reset Filters</MenuItemOption> */}

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
                      Filtrs
                    </Box>
                    <Text
                      fontSize={"15px"}
                      color={"red"}
                      onClick={resetCheckBox}
                    >
                      Reset
                    </Text>
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
                    <Text
                      marginRight={"13px"}
                      fontSize={"10px"}
                      color={"red"}
                      onClick={resetCheckBox}
                    >
                      Clear All
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel textAlign={"left"} display="block">
                  <Checkbox
                    isChecked={checkedItems[0]}
                    onChange={(e) => {
                      setCheckedItems([
                        e.target.checked,
                        checkedItems[1],
                        checkedItems[2],
                        checkedItems[3],
                        checkedItems[4],
                      ]);
                      setCheckBox();
                    }}
                  >
                    Makeup
                  </Checkbox>
                  <br />
                  <Checkbox
                    isChecked={checkedItems[1]}
                    onChange={(e) => {
                      setCheckedItems([
                        checkedItems[0],
                        e.target.checked,
                        checkedItems[2],
                        checkedItems[3],
                        checkedItems[4],
                      ]);
                      setCheckBox();
                    }}
                  >
                    Lips
                  </Checkbox>
                  <br />
                  <Checkbox
                    isChecked={checkedItems[2]}
                    onChange={(e) => {
                      setCheckedItems([
                        checkedItems[0],
                        checkedItems[1],
                        e.target.checked,
                        checkedItems[3],
                        checkedItems[4],
                      ]);
                      setCheckBox();
                    }}
                  >
                    Face
                  </Checkbox>
                  <br />
                  <Checkbox
                    isChecked={checkedItems[3]}
                    onChange={(e) => {
                      setCheckedItems([
                        checkedItems[0],
                        checkedItems[1],
                        checkedItems[2],
                        e.target.checked,
                        checkedItems[4],
                      ]);
                      setCheckBox();
                    }}
                  >
                    Brushes
                  </Checkbox>
                  <br />
                  <Checkbox
                    isChecked={checkedItems[4]}
                    onChange={(e) => {
                      setCheckedItems([
                        checkedItems[0],
                        checkedItems[1],
                        checkedItems[2],
                        checkedItems[3],
                        e.target.checked,
                      ]);
                      setCheckBox();
                    }}
                  >
                    Eye
                  </Checkbox>
                  <br />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* </MenuList>
            </Menu> */}
          </Box>
        </Box>
        <Grid
          display="grid"
          templateColumns={{
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(1,1fr)",
          }}
          w="75%"
          m="10px"
        >
          {data.map(
            (elem) =>
              elem.price !== undefined && (
                <GridItem>
                  <ProductBox
                    rating={elem.rating}
                    catg={elem.catg}
                    id={elem.id}
                    url={elem.image}
                    description={elem.name}
                    price={elem.price}
                  />
                </GridItem>
              )
          )}
        </Grid>
      </Flex>
    </div>
  );
}

export default Skincare;
