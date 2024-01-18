import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useToast } from '@chakra-ui/react'

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  const REBRANDLY_API_KEY = '25b51de08ffd4cdbaec12edc748f727c'; 
  const toast = useToast()

  const handleShorten = async () => {
    try {
      const requestData = {
        destination: longUrl,
      };

      if (customSlug) {
        requestData.slashtag = customSlug;
      }

      const response = await axios.post(
        'https://api.rebrandly.com/v1/links',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': REBRANDLY_API_KEY,
          },
        }
      );

      setShortUrl(response.data.shortUrl);
      setQRCodeUrl(response.data.shortUrl + '.qrcode');
      toast({
        title: 'Success',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
      title: 'Something went wrong!',
      status: 'error',
      duration: 9000,
      isClosable: true,
    }) 
    }
  };

  return (
    <>
      <Flex direction={'column'} width={'100%'}>
        <Flex p={3} fontWeight={600} width={'100%'}>
          Enter your long URL
        </Flex>
        <Box width={"50%"}>
          <Input
            m={4}
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL"
          />
          
          <Input
            m={4}
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter custom slug (optional)"
          />
          
          <Button m={4} onClick={handleShorten}>
            Shorten
          </Button>

          {shortUrl && (
            <Box m={4}>
              <Text>Short URL:</Text>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
              {qrCodeUrl && (
                <>
                  <Text>QR Code:</Text>
                  <QRCode value={qrCodeUrl} />
                </>
              )}
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default UrlForm;
