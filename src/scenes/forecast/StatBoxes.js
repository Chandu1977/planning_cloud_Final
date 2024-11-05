import React from 'react';
import { Box } from "@mui/material";
import StatBox from "../../components/StatBox";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const StatBoxes = ({ colors }) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" mb="20px">
      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <StatBox
          title="2.7M"
          subtitle="Actual Sales"
          progress="0.75"
          increase="+10%"
          icon={<TrendingUpIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
        />
      </Box>
      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <StatBox
          title="2.75M"
          subtitle="Forecasted Sales"
          progress="0.80"
          increase="+15%"
          icon={<AssessmentIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
        />
      </Box>
      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <StatBox
          title="95%"
          subtitle="Forecast Accuracy"
          progress={0.95}
          increase="+8%"
          icon={<InsertChartIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
        />
      </Box>
      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <StatBox
          title="5%"
          subtitle="Forecast Error"
          progress={0.05}
          increase="-2%"
          icon={<TrendingUpIcon sx={{ color: colors.redAccent[600], fontSize: "26px" }} />}
        />
      </Box>
    </Box>
  );
};

export default StatBoxes;
