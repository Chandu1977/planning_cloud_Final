import React, { useState, useEffect } from 'react';
import { Box, Typography, ButtonGroup, Button, useTheme } from "@mui/material";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, Brush, BarChart, Bar, ResponsiveContainer
} from 'recharts';
import { tokens } from "../../theme";

const generateData = (numPoints) => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < numPoints; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (numPoints - i));
        data.push({
            ds: date.toISOString().split('T')[0],
            actual: i < numPoints - 30 ? Math.floor(Math.random() * 100000) : null,
            forecast: Math.floor(Math.random() * 100000),
            lower: Math.floor(Math.random() * 80000),
            upper: Math.floor(Math.random() * 120000),
            trend: i < numPoints - 30 ? 50000 + i * 100 : 50000 + (numPoints - 30) * 100
        });
    }
    return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const filterDataByTimeframe = (data, timeframe) => {
    const now = new Date();
    let startDate;

    switch (timeframe) {
        case '1w':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
        case '1m':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
        case '6m':
            startDate = new Date(now.setMonth(now.getMonth() - 6));
            break;
        case '1y':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        case 'ytd':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
        default:
            return data;
    }

    return data.filter(d => new Date(d.ds) >= startDate);
};

const ChartComponents = ({ forecastData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [timeframe, setTimeframe] = useState('all');
    const [data, setData] = useState(generateData(365 * 3)); // Generating data for 3 years

    useEffect(() => {
        if (forecastData) {
            // Update the chart data with the new forecast data
            setData(forecastData);
        }
    }, [forecastData]);

    const filteredData = filterDataByTimeframe(data, timeframe);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="minmax(150px, auto)" gap="20px">

            {/* Actual vs Forecast */}
            <Box gridColumn="span 12" bgcolor={colors.primary[400]} p="20px" borderRadius="4px">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                    <Typography variant="h5" fontWeight="600">Actual vs Forecast</Typography>
                    <ButtonGroup variant="outlined" color="primary">
                        <Button onClick={() => setTimeframe('1w')}>1w</Button>
                        <Button onClick={() => setTimeframe('1m')}>1m</Button>
                        <Button onClick={() => setTimeframe('6m')}>6m</Button>
                        <Button onClick={() => setTimeframe('1y')}>1y</Button>
                        <Button onClick={() => setTimeframe('ytd')}>ytd</Button>
                        <Button onClick={() => setTimeframe('all')}>all</Button>
                    </ButtonGroup>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ds" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="upper" stroke="none" fill="rgba(136, 132, 216, 0.3)" />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="rgba(136, 132, 216, 0.3)" />
                        <Line type="monotone" dataKey="forecast" stroke="#FFBB28" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} dot={{ r: 1 }} />
                        <Line type="monotone" dataKey="trend" stroke="#8884d8" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                        <Brush dataKey="ds" height={30} stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {/* Sales Distribution */}
            <Box gridColumn="span 6" bgcolor={colors.primary[400]} p="20px" borderRadius="4px">
                <Typography variant="h5" fontWeight="600" mb="20px">Sales Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data.filter((d, i) => i % 30 === 0)} dataKey="forecast" outerRadius={100} innerRadius={60} paddingAngle={5} label>
                            {data.filter((d, i) => i % 30 === 0).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            {/* Monthly Sales Data */}
            <Box gridColumn="span 6" bgcolor={colors.primary[400]} p="20px" borderRadius="4px">
                <Typography variant="h5" fontWeight="600" mb="20px">Monthly Sales Data</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.filter((d, i) => i % 30 === 0)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ds" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="actual" fill={colors.blueAccent[500]} />
                        <Bar dataKey="forecast" fill={colors.greenAccent[500]} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            {/* Sales Trends */}
            <Box gridColumn="span 6" bgcolor={colors.primary[400]} p="20px" borderRadius="4px">
                <Typography variant="h5" fontWeight="600" mb="20px">Sales Trends</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="forecast" name="Forecast" />
                        <YAxis type="number" dataKey="actual" name="Actual" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Data Points" data={filteredData} fill={colors.greenAccent[500]} />
                    </ScatterChart>
                </ResponsiveContainer>
            </Box>

            {/* Monthly Sales Forecast */}
            <Box gridColumn="span 6" bgcolor={colors.primary[400]} p="20px" borderRadius="4px">
                <Typography variant="h5" fontWeight="600" mb="20px">Monthly Sales Forecast</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.filter((d, i) => i % 30 === 0)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ds" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="forecast" stroke={colors.greenAccent[500]} fill={colors.greenAccent[200]} />
                        <Area type="monotone" dataKey="actual" stroke={colors.blueAccent[500]} fill={colors.blueAccent[200]} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>

        </Box>
    );
};

export default ChartComponents;
