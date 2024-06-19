import { Container, Heading, VStack, Box, useToast, HStack, Select, Button } from "@chakra-ui/react";
import { Bar, Line, Pie, Radar, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { useSocket } from '../integrations/socket';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale);

const Dashboard = () => {
  const socket = useSocket();
  const toast = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (socket) {
      socket.on('dashboardDataUpdated', () => {
        toast({
          title: "Dashboard Data Updated",
          description: "The dashboard data has been updated.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('dashboardDataUpdated');
      }
    };
  }, [socket, toast]);

  const handleFilter = () => {
    // Implement filter logic here
    toast({
      title: "Filters Applied",
      description: `Filters applied from ${startDate.toDateString()} to ${endDate.toDateString()} for category ${category}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Returns",
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [15, 29, 5, 5, 20, 3],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ["Running", "Swimming", "Eating", "Cycling"],
    datasets: [
      {
        label: "My First Dataset",
        data: [20, 10, 4, 2],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 },
        ],
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <Heading as="h1" size="2xl" mb={4}>Dashboard</Heading>
      <VStack spacing={8} w="100%">
        <HStack spacing={4} mb={4}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Sales">Sales</option>
            <option value="Returns">Returns</option>
          </Select>
          <Button colorScheme="teal" onClick={handleFilter}>Apply Filters</Button>
        </HStack>
        <Box w="100%" p={5} shadow="md" borderWidth="1px">
          <Heading as="h2" size="lg" mb={4}>Sales Data</Heading>
          <Bar data={barData} />
        </Box>
        <Box w="100%" p={5} shadow="md" borderWidth="1px">
          <Heading as="h2" size="lg" mb={4}>Revenue Data</Heading>
          <Line data={lineData} />
        </Box>
        <Box w="100%" p={5} shadow="md" borderWidth="1px">
          <Heading as="h2" size="lg" mb={4}>Votes Distribution</Heading>
          <Pie data={pieData} />
        </Box>
        <Box w="100%" p={5} shadow="md" borderWidth="1px">
          <Heading as="h2" size="lg" mb={4}>Activity Data</Heading>
          <Radar data={radarData} />
        </Box>
        <Box w="100%" p={5} shadow="md" borderWidth="1px">
          <Heading as="h2" size="lg" mb={4}>Scatter Plot</Heading>
          <Scatter data={scatterData} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;