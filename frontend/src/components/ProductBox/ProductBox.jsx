import styles from "./ProductBox.module.css";
import { IconButton, Text, Box, useToast } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFav } from "../Homepage/Cart";
import { GiRoundStar } from "react-icons/gi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
function ProductBox(props) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();
  const username = useSelector((state) => state.cart.username);
  const [payload, setPayload] = useState({
    url: props.url,
    description: props.description,
    price: props.price,
    id: props.id,
    rating: props.rating,
    isFav: false,
  });

  return (
    <div>
      <div className={styles.imageCss2}>
        <Link to={`/${payload.catg}/${payload.id}`}>
          <img src={payload.url} alt="img" />
        </Link>
        <div className={styles.productDescription}>{payload.description}</div>
        <Box w="fit-content" display="flex" m="auto" gap="6px">
          <Text mt="3px" color="green">
            {" "}
            <GiRoundStar />
          </Text>
          <Text color="green">{payload.rating}</Text>
        </Box>
        <div className={styles.productPrice}>₹{payload.price}</div>
        <div className={styles.buttongrp}>
          <button
            onClick={() => {
              if (username === "Login/Register") {
                toast({
                  title: "Please login",
                  description: `Please login to add favourite items`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });

                navigate("/login");
              } else {
                // dispatch(addToFav(payload));
              }
              setPayload({
                url: payload.url,
                description: payload.description,
                price: payload.price,
                rating: payload.rating,
                id: payload.id,
                isFav: true,
              });
            }}
          >
            {" "}
            {payload.isFav ? (
              <IconButton
                ref={ref}
                border="2px solid black"
                fontSize="18px"
                colorScheme="teal"
                as={FiHeart}
                color="black"
                p="3px"
              />
            ) : (
              <IconButton
                ref={ref}
                border="2px solid black"
                fontSize="18px"
                as={FiHeart}
                color="black"
                p="3px"
              />
            )}
          </button>
          <button
             onClick={() => dispatch(addToCart(payload))}
            style={{
              width: "150px",
              color: "white",
              backgroundColor: "black",
              borderRadius: "5px",
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductBox;
