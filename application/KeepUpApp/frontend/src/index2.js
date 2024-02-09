import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpT from './pages/ExpensePage';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Navbar } from './components/Homepage/Navbar';
import App from './App';


function ExpenseTrack() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <ExpT />
    </GlobalProvider>
  </React.StrictMode>
);
}

export default ExpenseTrack;