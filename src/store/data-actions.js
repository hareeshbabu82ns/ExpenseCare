import { ID } from "appwrite";
import { databases } from "../appwrite/appwrite-config";
import { dataActions } from "./data-slice";

export function fetchData(userId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    promise.then(
      (userDocument) => {
        console.log(userDocument);
        dispatch(dataActions.setCartData(userDocument));
      },
      (error) => console.log(error)
    );
  };
}

export function addCategory(userId, categoryName) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    promise.then(
      (userDocument) => {
        const categoryExists = userDocument.category.find(
          (category) =>
            category.name.toLowercase() === categoryName.toLowercase()
        );

        if (categoryExists) {
          console.log("category already exists");
          return userDocument;
        }

        const promise = databases.updateDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_USER_ID,
          userId,
          {
            category: [...userDocument.category, { name: categoryName }],
          }
        );

        promise.then(
          (updatedDocument) => {
            console.log(updatedDocument);
            dispatch(dataActions.setCartData(updatedDocument));
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  };
}

export function addExpense(userId, categoryId, expenseDetails) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_CATEGORY_ID,
      categoryId
    );

    promise.then(
      (categoryDocument) => {
        console.log(categoryDocument);

        const { amount } = expenseDetails;

        const promise = databases.updateDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_CATEGORY_ID,
          categoryId,
          {
            expense: [
              ...categoryDocument.expense,
              { ...expenseDetails, user: userId },
            ],
            totalAmount:
              parseInt(categoryDocument.totalAmount) + parseInt(amount),
          }
        );

        promise.then(
          (updatedCategoryDocument) => {
            console.log(updatedCategoryDocument);
            dispatch(fetchData(userId));
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  };
}
