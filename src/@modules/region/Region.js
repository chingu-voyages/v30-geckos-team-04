import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Region.module.css";
import SearchBar from "../search/SearchBar";
import CurrentContext from "../../context/Current";
import Card from "../common/components/card/Card";

const Region = () => {
  const { currentLocation } = useContext(CurrentContext);
  console.log("currentLocation", currentLocation);
  const useGetMeasurements = (location) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
      const data = [44.8367, -91.3621];
      const fetchMeasurements = async (location) => {
        try {
          const response = await axios(
            `https://docs.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&coordinates=${data[0]}%2C${data[1]}&radius=100&order_by=lastUpdated&dumpRaw=false`
          );
          const measurements = response.data.results[0];
          console.log("measurements ", measurements);
          setResults(measurements);
        } catch (error) {
          console.log("error", error.message);
        }
      };
      if (location !== "") {
        fetchMeasurements(location);
      }
    }, [location]);
    return results;
  };
  const results = useGetMeasurements(currentLocation);

  console.log("results", results);
  return (
    <div className={styles.region}>
      <h1 className={styles.title}>Region</h1>
      <SearchBar />
      {currentLocation.length === 0 ? (
        <></>
      ) : results.length > 0 ? (
        <>
          <h2>Search Results-{results.location}</h2>
          <h2>No Results Found</h2>
        </>
      ) : (
        <>
          <h2>Search Results-{results.location}</h2>
          <Card
            location={results.location}
            country={results.country}
            measurements={results.measurements}
          />
        </>
      )}
    </div>
  );
};
export default Region;
