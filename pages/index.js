import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ({ purpose, title1, title2, desc1, desc2, linkName, ButtonText, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br/>{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700" fontWeight="medium">{desc1}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{ButtonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent}) {
  console.log(propertiesForRent, propertiesForSale)
  return (
    <Box>
      <Banner 
        purpose="Rent A Home"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Appartments, Villas, Home"
        desc2="and more"
        ButtonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner 
        purpose="Buy A Home"
        title1="Find, Buy and Own Your"
        title2="Dream Home"
        desc1="Explore Appartments, Villas, Home"
        desc2="and more"
        ButtonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      {propertiesForSale.map((property) => <Property property={property} key={property.id}/>)}
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  }
}