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
import ProductBox from "../components/ProductBox/ProductBox";
import SortingFiltering from "../components/SortingFiltering";
import axios from "axios";

function Skincare() {
  const breakpoints = {
    lg: "1024",
    md: "786",
    sm: "480",
  };
  // const [checkedItems, setCheckedItems] = React.useState([
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);
   const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [order, setOrder] = useState("");
  // const [prod, setProd] = useState("");
  // async function getData(url) {
  //   try {
  //     var res = await fetch(url);
  //     var res2 = await res.json();
  //     setData(res2.data.products);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   //let url = "https://scserver.onrender.com/api/products";
  //   let url = "https://concerned-cyan-tank-top.cyclic.app/api/products";
  //   getData(url);
  // }, [order, prod]);

  // function setValue(e) {
  //   if (e.target.value === "1") {
  //     data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  //   } else {
  //     data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  //   }
  //   console.log(data, "data");
  //   let newArr = [];
  //   for (let i = 0; i < data.length; i++) {
  //     newArr.push(data[i]);
  //   }
  //   setData([...newArr]);
  // }

  

  // function setCheckBox() {
  //   let url = "https://concerned-cyan-tank-top.cyclic.app/api/products/cat";
  //   let key = "?cat=";
  //   if (checkedItems[0] == true) {
  //     key += "makeup,";
  //   }
  //   if (checkedItems[1] == true) {
  //     key += "Lips,";
  //   }

  //   if (checkedItems[2] == true) {
  //     key += "Face,";
  //   }
  //   if (checkedItems[3] == true) {
  //     key += "brushes,";
  //   }
  //   if (checkedItems[4] == true) {
  //     key += "eye";
  //   }
  //   if (key !== "?cat=") url += key;
  //   console.log(url, "urls");
  //   getData(url);
  //   shuffleArray(data);
  //   let arr = [];
  //   for (let i = 0; i < 12; i++) {
  //     arr.push(data[i]);
  //   }
  //   setData(arr);
  // }
  // function shuffleArray(array) {
  //   for (var i = array.length - 1; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     var temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  // }

  const [obj, setObj] = useState({});
	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [filterGenre, setFilterGenre] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const getAllMovies = async () => {
			try {
				const url = `https://concerned-cyan-tank-top.cyclic.app/api/products?page=${page}&sort=${sort.sort},${
					sort.order
				}&genre=${filterGenre.toString()}&search=${search}`;
				var res = await fetch(url);
       var res2 = await res.json();
       setData(res2.data.products);
        console.log(data)
			} catch (err) {
				console.log(err);
			}
		};

		getAllMovies();
	}, [sort, filterGenre, page, search]);

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
            <SortingFiltering sort={sort} setSort={(sort) => setSort(sort)}
            filterGenre={filterGenre}
            genres={obj.genres ? obj.genres : []}
            setFilterGenre={(genre) => setFilterGenre(genre)}
            />
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
