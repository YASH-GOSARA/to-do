import {
  Box,
  Button,
  FormControl,
  Input,
  List,
  Text,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const [marked, setMarked] = useState([]);

  const input = useRef();

  useEffect(() => {
    const Notes = JSON.parse(localStorage.getItem("storedNotes"));
    const Marked = JSON.parse(localStorage.getItem("storedMarked"));

    if (Notes && Marked) {
      setNotes((prev) => [...Notes, ...prev]);
      setMarked((prev) => [...Marked, ...prev]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storedNotes", JSON.stringify(notes));
    localStorage.setItem("storedMarked", JSON.stringify(marked));
  }, [notes, marked]);

  const removeNote = (e, index) => {
    let i = notes.findIndex(
      (ele, index, arr) => ele === e.currentTarget.nextSibling.innerHTML
    );
    notes.splice(i, 1);
    marked.splice(i, 1);
    setMarked([...marked]);
    setNotes([...notes]);
  };
  return (
    <Box
      backgroundColor={"gray.700"}
      justifyContent="center"
      paddingTop="15px"
      minH={"100vh"}
      paddingBottom={"15px"}
    >
      <Box
        zIndex={1000}
        position="fixed"
        top={0}
        left={"50%"}
        transform="translate(-50%,0)"
        bg={"gray.800"}
        w={"100%"}
      >
        <Heading
          fontSize={"2.5rem"}
          as="h1"
          color={"yellow.400"}
          textAlign="center"
          marginBottom={5}
        >
          To-Do App
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (notes.includes(note)) {
              alert("Note Already Exits📃...");
            } else if (note === "") {
              alert("Please Enter Something✅...");
            } else {
              setNotes([note, ...notes]);
              setMarked([false, ...marked]);
              input.current.value = "";
              setNote("");
            }
          }}
        >
          <FormControl
            width={"300px"}
            margin={"0px auto 15px auto"}
            textAlign="center"
          >
            <Input
              type="text"
              placeholder="Enter Note"
              marginBottom={5}
              color="white"
              onChange={(e) => {
                setNote(e.currentTarget.value);
              }}
              autoFocus
              ref={input}
            />
            <Button
              type="submit"
              bg={"yellow.400"}
              _hover={{ bg: "yellow.300", transition: "all 0.5s" }}
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
      <List overflowX={"hidden"} color="white" marginTop={"200px"}>
        <Box>
          <AnimatePresence>
            {notes.map((note, index) => {
              return (
                <motion.div
                  key={note}
                  initial={{ x: "-40vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "60vw", opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.sqrt(index) * 0.09,
                  }}
                >
                  <Box
                    cursor="pointer"
                    mb={2}
                    display="flex"
                    alignItems={"center"}
                    justifyContent="center"
                  >
                    <Text
                      fontSize={"1.5rem"}
                      display={"inline"}
                      marginRight={5}
                      onClick={(e) => removeNote(e, index)}
                    >
                      ❌
                    </Text>
                    <ListItem
                      fontSize={"1.5rem"}
                      maxW={"45vw"}
                      wordBreak="break-word"
                      display={"inline"}
                      textDecoration={marked[index] ? "line-through" : "none"}
                      onClick={(e) => {
                        let temp = marked;
                        temp[index] = !temp[index];
                        setMarked([...temp]);
                        if (temp[index]) {
                          e.currentTarget.style.textDecoration = "line-through";
                        } else {
                          e.currentTarget.style.textDecoration = "none";
                        }
                      }}
                    >
                      {note}
                    </ListItem>
                  </Box>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </List>
    </Box>
  );
};

export default App;
