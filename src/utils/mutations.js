import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        savedRecipes {          
          idMeal
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SAVE_MEAL = gql`
    mutation saveRecipe($mealData: RecipeInput!){
      saveRecipe(mealData: $mealData){
            _id
            username
            email            
            savedRecipes {
                idMeal
                strMeal
                strMealThumb  
            }

        }
    }
`;

export const REMOVE_MEAL = gql`
    mutation removeRecipe($idMeal: String!){
      removeRecipe(idMeal: $idMeal){
            _id
            username
            email            
            savedRecipes {
                idMeal
                strMeal
                strMealThumb  
            }

        }
    }
`;
