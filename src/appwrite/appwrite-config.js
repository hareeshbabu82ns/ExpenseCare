import { Client, Account, ID, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint("https://expense-care.vercel.app") // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

export const account = new Account(client);

export const databases = new Databases(client, import.meta.env.VITE_DB_ID);

export const functions = new Functions(client);
