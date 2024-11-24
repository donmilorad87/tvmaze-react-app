
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '@pages/homepage';
import HomepagePagination from '@pages/homepagePagination';
import Show from '@pages/show';
import HomepageLoadMore from '@pages/homepageLoadMore';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pagination" element={<HomepagePagination />} />
        <Route path="/load_more" element={<HomepageLoadMore />} />
        <Route path="/show/:show_id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
