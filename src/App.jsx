import { Flex } from "@chakra-ui/react"
import UrlForm from "./components/Shortner"
import Header from "./components/Header"


function App() {
 

  return (
    <>
    <Header />
      <Flex justifyContent={"center"}  height={"100vh"}>
      <UrlForm />
      </Flex>
    </>
  )
}

export default App
