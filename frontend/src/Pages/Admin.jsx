import { Box, Button, Grid, Image, Input, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [dprice, setDprice] = useState("");
  const [count, setCount] = useState(50);
  const [data, setData] = useState([]);
 // setName(""); setDescription(""); setUrl(""); setPrice(""); setDprice("")
  useEffect(() => {
    axios
      .get("https://alert-cyan-kingfisher.cyclic.app/books")
      .then((e) => setData(e.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(data);
  // https://alert-cyan-kingfisher.cyclic.app/books

  function Preview() {
    setCount(count + 1);
    // localStorage.setItem("product",JSON.stringify({name,description,url,price,dprice,count}))
    axios
      .post("https://alert-cyan-kingfisher.cyclic.app/books", {
        name,
        description,
        url,
        price,
        dprice,
      })
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
      alert("Successfuly Complite")
      window.location.reload()
      // setName(""); setDescription(""); setUrl(""); setPrice(""); setDprice("")
  }

  function delprod(id) {
    axios
      .delete(`https://alert-cyan-kingfisher.cyclic.app/books/${id}`)
      .then((e) => console.log("deleted succ"))
      .catch((e) => console.log(e));
      alert("Item Removed")
      window.location.reload()
  }
  // console.log(data)
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "10%",
      }}
    >
      <Box w={"30%"}>
        <Box>
          <Input
            placeholder="Product-Name"
            size="lg"
            w="100%"
            mt="150px"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box>
          <Input
            placeholder="Product description"
            size="lg"
            w="100%"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="image_url"
            size="lg"
            w="100%"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="Price"
            size="lg"
            w="100%"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="Discounted Price"
            size="lg"
            w="100%"
            onChange={(e) => setDprice(e.target.value)}
          />
        </Box>

        <Button mt={'20px'} colorScheme="blue" w="100%" onClick={Preview}>
          Add Product
        </Button>
      </Box>

      <Box border={"1px solid black"} ml={"5%"} w={"60%"}>
        <Text fontSize={"30px"} textAlign={"center"}>
          {" "}
          Total Product : {data.length + 50}
        </Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={3}
          // border={"1px solid black"}
          ml={'12%'}
        >
          {data.map((dataa, i) => (
            <Box
              w={"70%"}
              border={"1px solid black"}
              mt={"50px"}
              borderRadius={"15px"}
            >
              {" "}
              <Box w={"100%"} h={"240px"}>
                <Image
                  borderTopRightRadius={"15px"}
                  borderTopLeftRadius={"15px"}
                  w={"100%"}
                  h={"240px"}
                  src={dataa.url}
                />
              </Box>
              <Text mt={"10px"} fontWeight={500} fontSize={"18px"}>
                {dataa.name}
              </Text>
              <Text fontWeight={400} fontSize={"15px"}>
                {" "}
                Price : {dataa.price}/-
              </Text>
              <Box display={"flex"} gap={"5"} justifyContent={"center"}>
                <Button
                  mt={"10px"}
                  width={"40%"}
                  mb={"20px"}
                  colorScheme={"red"}
                  onClick={() => {
                    delprod(dataa.id);
                  }}
                >
                  Remove
                </Button>
                <Button
                  mt={"10px"}
                  width={"40%"}
                  mb={"20px"}
                  colorScheme={"green"}
                >
                  Edit Item
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
