import React from "react";
import data from "./data.json";
import { Table, Container } from "@mantine/core";
import { calculateMean, calculateMedian, calculateMode } from "../../utils";

interface WineData {
  Alcohol: string;
  Flavanoids: string;
}

const FlavanoidsTable: React.FC = () => {
  const wineData: WineData[] = data.map((item) => ({
    Alcohol: String(item.Alcohol),
    Flavanoids: String(item.Flavanoids),
  }));

  const classDataMap: { [key: string]: number[] } = {};

  wineData.forEach(({ Alcohol, Flavanoids }) => {
    const classNum: string = Alcohol;
    const flavanoidsValue: number = parseFloat(Flavanoids);
    if (!classDataMap[classNum]) {
      classDataMap[classNum] = [];
    }
    classDataMap[classNum].push(flavanoidsValue);
  });

  const calculateStats = (
    classData: number[]
  ): {
    mean: number;
    median: number;
    modeValue: number;
  } => {
    const mean: number = calculateMean(classData);
    const median: number = calculateMedian(classData);
    const modeValue: number = calculateMode(classData);
    return { mean, median, modeValue };
  };

  return (
    <Container>
      <h2>Flavanoids Statistics</h2>
      <Table
        withColumnBorders
        withTableBorder
        striped
        highlightOnHover
        width={10}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {Object.entries(classDataMap).map(([classNum]) => (
              <Table.Th key={classNum}>Class {classNum}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Flavanoids Mean</Table.Td>
            {Object.entries(classDataMap).map(([classNum, classData]) => {
              const { mean } = calculateStats(classData);
              return <Table.Td key={classNum}>{mean}</Table.Td>;
            })}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Flavanoids Median</Table.Td>
            {Object.entries(classDataMap).map(([classNum, classData]) => {
              const { median } = calculateStats(classData);
              return <Table.Td key={classNum}>{median}</Table.Td>;
            })}
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Flavanoids Mode</Table.Td>
            {Object.entries(classDataMap).map(([classNum, classData]) => {
              const { modeValue } = calculateStats(classData);
              return <Table.Td key={classNum}>{modeValue}</Table.Td>;
            })}
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default FlavanoidsTable;
