import React, { useState } from 'react';
import { Box, Button, useTheme, Drawer } from "@mui/material";
import Header from "../../components/Header";
import StatBoxes from "./StatBoxes";
import ChartComponents from "./ChartComponents";
import { tokens } from "../../theme";
import CustomAnalysis from "./CustomAnalysis";

const Forecast = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [forecastData, setForecastData] = useState(null); // State to hold the forecast data

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleForecastComplete = (data) => {
        setForecastData(data); // Update the state with the forecast data
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Sales Forecast" subtitle="Visualizing Demand Projections" />
                <Button variant="contained" color="secondary" onClick={toggleDrawer(true)} sx={{ mt: 2 }}>
                    Custom Analysis
                </Button>
            </Box>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <CustomAnalysis open={drawerOpen} onClose={toggleDrawer(false)} onForecastComplete={handleForecastComplete} />
            </Drawer>

            <StatBoxes colors={colors} />

            <ChartComponents forecastData={forecastData} /> {/* Pass the forecast data to ChartComponents */}
        </Box>
    );
};

export default Forecast;
