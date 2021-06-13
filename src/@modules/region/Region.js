import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Region.module.css";
import SearchBar from "../search/SearchBar";
import CurrentContext from "../../context/Current";
import Card from "../../@modules/common/components/card/Card";
const Region = () => {
  const { currentLocation } = useContext(CurrentContext);
  console.log("currentLocation", currentLocation);
  const [data, setData] = useState([44.8367, -91.3621]);

  useEffect(() => {
    const fetchLatAndLong = async () => {
      try {
        const result = await axios.get(
          `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST}&location=${currentLocation}`
        );
        setData(result.data.results[0].locations[0].displayLatLng);
      } catch (error) {
        console.error(error);
      }
      return data;
    };
    if (currentLocation.length > 0) {
      fetchLatAndLong();
    }
  }, [currentLocation]);
  console.log("loc data", currentLocation, data);

  const useGetMeasurements = (location) => {
    const [results, setResults] = useState([]);
    useEffect(() => {
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
            location={results?.location}
            country={results?.country}
            measurements={results?.measurements}
          />
        </>
      )}
    </div>
  );
};
export default Region;
