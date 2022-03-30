import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import { baseUrl, fetchApi } from '../../utils/fetchApi';

const propertyDetails = ({ propertyDetails: {price, rentFrequency, title, baths, area, agengy, isVerified, description, type, purpose, furnishingStatus, amenities, photos} }) => (
    <Box maxWidth="1000px" margin="auto" p="4">
        {photos && <ImageScrollbar data={photos} />}
    </Box>
)

export default propertyDetails;

export async function getServerSideProps({ params: {id}}) {
    const data = await fetchApi(`${baseUrl}/properties/details?ExternalIDs=${id}`)

    return {
        props: {
            propertyDetails: data
        }
    }
}