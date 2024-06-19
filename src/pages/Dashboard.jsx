import { Container, Heading, VStack, Box } from "@chakra-ui/react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { useEffect } from 'react';
import { useSocket } from '../integrations/socket';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('dashboardDataUpdated', () => {
        // Handle real-time updates for dashboard data
      });
    }

    return () => {
      if (socket) {
        socket.off('dashboardDataUpdated');
      }
    };
  }, [socket]);

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

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <Heading as="h1" size="2xl" mb={4}>Dashboard</Heading>
      <VStack spacing={8} w="100%">
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
      </VStack>
    </Container>
  );
};

export default Dashboard;