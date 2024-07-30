import React from 'react';
import { BrowserRouter , Route, Routes, Navigate} from 'react-router-dom';
import AdminLayout from "./layouts/Admin";
export function App  () {
  
    return (
       
           <BrowserRouter>
             <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/admin/*" element={<AdminLayout/>} />
             </Routes>
           </BrowserRouter>
        
      
    );
  };

