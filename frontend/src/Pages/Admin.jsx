import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [dprice, setDprice] = useState("");
  const [count, setCount] = useState(50);
  const [data, setData] = useState([]);

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
    // window.location.reload()
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
    }

    function delprod(id){
        axios.delete(`https://alert-cyan-kingfisher.cyclic.app/books/${id}`)
        .then((e)=>console.log("deleted succ"))
        .catch((e)=>console.log(e));
    }
  // console.log(data)
  return (
    <div
      style={{
        display: "flex",
        height: "500px",
        width: "80%",
        marginLeft: "10%",
      }}
    >
      <div>
        <Box>
          <Input
            placeholder="Product-Name"
            size="lg"
            w="150%"
            mt="150px"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box>
          <Input
            placeholder="Product description"
            size="lg"
            w="150%"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="image_url"
            size="lg"
            w="150%"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="Price"
            size="lg"
            w="150%"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="Discounted Price"
            size="lg"
            w="150%"
            onChange={(e) => setDprice(e.target.value)}
          />
        </Box>

        <Button colorScheme="blue" w="150%" onClick={Preview}>
          Add Product
        </Button>
      </div>
<Box>
      <Text fontSize={"30px"} textAlign={"center"}
>      Total Product : {data.length+50}
         </Text>
    <Box>
      {data.map((dataa,i) => (
        <Box
          w={"70%"}
          h={"500px"}
          border={"1px solid black"}
          ml={"30%"}
          mt={"50px"}
        >
        
          
            <Image src={dataa.url} />

            <Text>{dataa.name}</Text>
            <span>{dataa.price}</span>
            <span>{dataa.dprice}</span>
            <Button colorScheme={"red"} onClick={()=>{delprod(dataa.id)}} >Remove Item</Button>
          </Box>
    
      ))}</Box>
      </Box>
    </div>
  );
}


export { Admin };
