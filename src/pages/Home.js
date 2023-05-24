import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";



import * as Icon from "react-bootstrap-icons";


const Main = () => {
  console.log("home: /");
  return (
    <Container fluid className="home-container">
      <Row>
        <Col className="home-banner banner-container ">
          <h2>Discover Delicious Delights</h2>
          <p>
            Join Our Community and Unleash Your Inner Chef with Incredible
            Recipes!
          </p>
          <Button size="lg" className="get-started-btn">
            <Link to="/search">Browse</Link>
          </Button>
        </Col>
      </Row>
      <Row className="description-item-container">
        <h1> Discover Our features</h1>
        <div className="desc_items">
        <Col className="description-item">
          <Icon.Search className="description-icon" />
          <h4>Search for Recipes</h4>
          <p>Find your favorite dish or explore new ingredients.</p>
        </Col>
        <Col className="description-item">
          <Icon.HeartFill className="description-icon" />
          <h4>Save Recipes</h4>
          <p>
            Bookmark your favorite recipes and add ingredients to your shopping
            list.
          </p>
        </Col>
        <Col className="description-item">
          <Icon.Globe2 className="description-icon" />
          <h4>Discover Cuisines</h4>
          <p>Explore different cuisines from around the world.</p>
        </Col>
        </div>
      </Row>
      <Row className="family">
        <div class="container_fam">
          <div class="col-md-5">
            <h2>Enjoy</h2>
            <p>
              Bring the joy back to meal time with family and friends around the
              table.
            </p>
            <Button size="lg" className="get-started-btn">
              <Link to="/search">Start Now</Link>
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Main;
// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';

// import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

// import { searchRecipes } from '../utils/API';

// const Home = () => {
//   const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const thoughts = data?.thoughts || [];

//   // create state for holding returned google api data
//   const [searchedBooks, setSearchedBooks] = useState([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   const [searchedCategories, setCategories] = useState([]);
//   const [query, setQuery] = useState('');
//   const [total, setTotalResults] = useState(0);

//   const handleFormSubmit = (async (query) => {
//     // const query = "categories.php";

//     try {
//       const response = await searchRecipes(query);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const { categories } = await response.json();

//       console.log("categories: ", categories);
//       setCategories(categories);

//     } catch (err) {
//       console.error(JSON.parse(JSON.stringify(err)));
//     }

//   });

//   // handleFormSubmit();

//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: '1px dotted #1a1a1a' }}
//         >
//           <p>Result: {searchedCategories.map((category) => (
//             <div>
//               <p>Category: {category.strCategory}</p>
//               <img src={category.strCategoryThumb} alt={category.strCategory} />
//               <p>Description: {category.strCategoryDescription}</p>
//             </div>

//           ))} </p>

//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={() => handleFormSubmit('categories.php')}
//           >
//             Search
//           </button>

//           <ThoughtForm />
//         </div>
//         <div className="col-12 col-md-8 mb-3">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <ThoughtList
//               thoughts={thoughts}
//               title="Some Feed for Thought(s)..."
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;
