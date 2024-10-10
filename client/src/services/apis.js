import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Your backend URL

export const getUser = async (userId) => {
  try {
       const response = await axios.get(`${API_URL}/users/${userId}`);
       console.log("User Fetched");
       return response.data;
       
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getConditions = async (userId) => {
  try {
       const response = await axios.get(`${API_URL}/users/${userId}/conditions`);
       console.log("Condition Fetched");
    return response.data;
  } catch (error) {
    console.error("Error fetching conditions:", error);
    throw error;
  }
};

export const getMedications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/medications`);
       console.log("Medication Fetched");
       return response.data;
  } catch (error) {
    console.error("Error fetching medications:", error);
    throw error;
  }
};

export const getMetrics = async (userId) => {
  try {
       const response = await axios.get(`${API_URL}/users/${userId}/metrics`);
       console.log("Metrics Fetched");
    return response.data;
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error;
  }
};

export const getReminders = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/reminders`);
       console.log("Reminders Fetched");
       return response.data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
};
