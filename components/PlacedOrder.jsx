import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
  } from '@chakra-ui/react';
  import { BsBagHeartFill } from 'react-icons/bs';
  import { CiDeliveryTruck } from 'react-icons/ci';
  import { GiNetworkBars } from 'react-icons/gi';

  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={'gray.500'}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={'gray.200'}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function PlacedOrder() {
    return (
      <Box id='aboutus' maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Our company is expanding.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Happy Bags'}
            stat={'50,400'}
            icon={<BsBagHeartFill size={'3em'} />}
          />
          <StatsCard
            title={'Open Delievery'}
            stat={'78'}
            icon={<CiDeliveryTruck size={'3em'} />}
          />
          <StatsCard
            title={'Traffic'}
            stat={'7% higher than usual'}
            icon={<GiNetworkBars size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }