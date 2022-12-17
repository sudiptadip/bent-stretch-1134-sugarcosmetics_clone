import React from "react";
import styles from "./Login.module.css";
import {Admin} from "./Admin";

import {
  useToast,
  Button,
  PinInput,
  HStack,
  PinInputField,
  Modal,
  Text,
  Box,
  Alert,
  AlertIcon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleUsername } from "../features/Cart/Cart";

const Login = () => {
  const [randomOtp, setRandomOtp] = useState("");
  const [username,setUsername] = useState('')
  const [userpassword,setUserpassword] = useState('')
  const navigate=useNavigate();
  const [pin, setPin] = useState(null);
  const [phone, setPhone] = useState(null);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const toast = useToast();
  const [accessToken, setAccessToken] = useState("");
  const [userDetails, setUserDetails] = useState({});

  function getAccessToken(pin) {
    fetch("https://concerned-cyan-tank-top.cyclic.app/api/user/signup/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: phone,
        otp: pin,
        email: userDetails.email,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.token);
      });
  }

  let otp = "";
  function getOtp() {
    fetch("https://concerned-cyan-tank-top.cyclic.app/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: phone }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setRandomOtp(data.otp);
          otp = data.otp;
          toast({
            title: "OTP sent successfully",
            description: `Your OTP is ${data.otp}.`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top",
          });
        } else alert("Otp didn't sent");
      });
  }
  function ToastExample() {
    return (
      <button
        className={styles.otp_btn}
        onClick={() => {
          if (phone.length != 10) {
            alert("Please enter a valid phone number");
          } else {
            //const ranOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
            getOtp();

            setStatus(true);
          }
        }}
      >
        SEND ME OTP
      </button>
    );
  }

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userName, setUserName] = useState("");
    function handleName(e) {
      setUserName(e.target.value);
    }

    return (
      <>
        <Button onClick={onOpen} mr={3} mt="30px" bg="black" color="white">
          VALIDATE OTP
        </Button>
        {randomOtp == pin ? (
          <Modal isOpen={isOpen} onClose={onClose}>
            {getAccessToken(pin)}
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>Please fill this form below</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        first_name: e.target.value,
                      });
                    }}
                  >
                    First name
                  </FormLabel>
                  <Input
                    placeholder="First name"
                    value={userName}
                    onChange={handleName}
                  />
                  <FormLabel
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        last_name: e.target.value,
                      });
                    }}
                  >
                    Last name
                  </FormLabel>
                  <Input placeholder="Last name" />
                  <FormLabel
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, email: e.target.value });
                    }}
                  >
                    Email
                  </FormLabel>
                  <Input placeholder="example@gmail.com" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Link to="/">
                  {" "}
                  <Button
                    mr={3}
                    bg="black"
                    color="white"
                    onClick={() => {
                      dispatch(toggleUsername(userName));
                    }}
                  >
                    Sign Me Up
                  </Button>
                </Link>

                <Button mr={3} bg="white" color="black" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Wrong OTP!!!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Please enter right OTP</Text>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} bg="black" color="white" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }

  const handleOtp = (value) => {
    setPin(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.img_left}>
        <img
          className={styles.image}
          src="https://media.sugarcosmetics.com/upload/authSIe2.jpg"
        />
      </div>
      <div className={styles.img_right}>
        <div className={styles.hi_image}>
          <img src="https://media.sugarcosmetics.com/upload/Hi!.png" />
        </div>
        {/* <div>
          
        </div> */}
        <div className={styles.logininput} style={{margin:"auto"}}>
          <Tabs isManual variant="enclosed">
            <TabList>
              <Tab>Admin</Tab>
              <Tab>User</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <Stack spacing={3} style={{margin:"auto"}}>
              <Input placeholder='User-Name / Email' size='lg' onChange={(e)=>setUsername(e.target.value)} />
  <Input placeholder='Password' size='lg' type="password" onChange={(e)=>setUserpassword(e.target.value)} />
 
    <Button colorScheme='blue' onClick={()=>{
      if(username == "uday@masai.com" && userpassword == "uday@123"){
        navigate("/admin")
      }else{
        alert("wrong email and password")
      }
      
      }} >Login</Button>
</Stack>
              </TabPanel>
              <TabPanel>
              <div className={styles.logininput}>
          <h3>Login/Sign Up Using Phone</h3>
        </div>

        {!status ? (
          <div className={styles.input_box} style={{margin:  "auto"}}>
            {" "}
            <div className={styles.input_num}>+91</div>
            <div >
              <input
        
                className={styles.input_item}
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <HStack>
              <PinInput value={pin} onComplete={handleOtp} otp>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </div>
        )}
        <div className={styles.text}>
          Registering for this site allows you to access your order status and
          history. Just fill in the above fields, and we'll get a new account
          set up for you in no time. We will only ask you for information
          necessary to make the purchase process faster and easier.
        </div>
        {!status ? <ToastExample /> : <BasicUsage />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        
        <div>
         

          {/* <div> <button className={styles.otp_btn} onClick={()=>{
      dispatch(toggleUsername(name))
      if(randomOtp==pin){
        alert("Please select");
      <BasicUsage/>
      }}}>VALIDATE OTP</button>
        
            <hr className={styles.dotted_line}/>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
