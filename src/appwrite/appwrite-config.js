import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("64726c3cc1a19aee8adc"); // Your project ID

export const account = new Account(client);

export const databases = new Databases(client, import.meta.env.VITE_DB_ID);
