import React, { useState, useEffect } from "react";
import data from "./data.json";
import { Table, Container } from "@mantine/core";
import { calculateMean, calculateMedian, calculateMode } from "../../utils";

interface WineData {
  Gamma: any;
  Alcohol: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
  Flavanoids: number;
}

interface GammaStats {
  classNum: number;
  mean: number;
  median: number;
  mode: number;
}

const calculateGamma = (data: WineData[]): WineData[] => {
  return data.map((item) => {
    const ash = parseFloat(String(item.Ash));
    const gamma = (ash * item.Hue) / item.Magnesium;
    return { ...item, Gamma: gamma };
  });
};

const GammaTable: React.FC = () => {
  const [gammaStats, setGammaStats] = useState<GammaStats[]>([]);

  const convertData = (rawData: any[]): WineData[] => {
    return rawData.map((item) => ({
      ...item,
      Ash: parseFloat(item.Ash),
    }));
  };

  useEffect(() => {
    const dataWithGamma = calculateGamma(convertData(data));

    const numClasses = [...new Set(dataWithGamma.map((item) => item.Alcohol))];

    const stats = numClasses.map((classNum) => {
      const classData = dataWithGamma
        .filter((item) => item.Alcohol === classNum)
        .map((item) => item.Gamma);
      return {
        classNum: classNum,
        mean: calculateMean(classData),
        median: calculateMedian(classData),
        mode: calculateMode(classData),
      };
    });

    setGammaStats(stats);
  }, []);

  return (
    <Container>
      <h2>Class-wise Gamma Statistics</h2>
      <Table withColumnBorders withTableBorder striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {gammaStats.map((stat) => (
              <Table.Th key={stat.classNum}>Class {stat.classNum}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Gamma Mean</Table.Td>
            {gammaStats.map((stat) => (
              <Table.Td key={stat.classNum}>{stat.mean}</Table.Td>
            ))}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gamma Median</Table.Td>
            {gammaStats.map((stat) => (
              <Table.Td key={stat.classNum}>{stat.median}</Table.Td>
            ))}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gamma Mode</Table.Td>
            {gammaStats.map((stat) => (
              <Table.Td key={stat.classNum}>{stat.mode}</Table.Td>
            ))}
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default GammaTable;
