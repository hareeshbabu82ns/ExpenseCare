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
            category.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (categoryExists) {
          console.log("category already exists");
          return userDocument;
        }

        const promise = databases.createDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_CATEGORY_ID,
          ID.unique(),
          {
            name: categoryName,
            user: userId,
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

export function editCategoryName(categoryId, newCategoryName) {
  return function (dispatch) {
    const promise = databases.updateDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_CATEGORY_ID,
      categoryId,
      {
        name: newCategoryName,
      }
    );

    promise.then(
      (updatedCategoryDocument) => {
        console.log(updatedCategoryDocument);
        const userId = updatedCategoryDocument.user.$id;
        dispatch(fetchData(userId));
      },
      (error) => console.log(error)
    );
  };
}

export function addExpense(userId, categoryId, expenseDetails) {
  return function (dispatch) {
    const { amount, name, description } = expenseDetails;
    const promise = databases.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_EXPENSE_ID,
      ID.unique(),
      {
        amount,
        name,
        description,
        category: categoryId,
        user: userId,
      }
    );

    promise.then(
      (updatedExpenseDocument) => {
        console.log(updatedExpenseDocument);
        dispatch(reEvaluateCategoryTotalAmount(categoryId));
      },
      (error) => console.log(error)
    );
  };
}

export function reEvaluateCategoryTotalAmount(categoryId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_CATEGORY_ID,
      categoryId
    );

    promise.then((categoryDocument) => {
      const initialValue = 0;
      const totalAmount = categoryDocument.expense.reduce(
        (toalExpense, currExpense) =>
          toalExpense + parseInt(currExpense.amount),
        initialValue
      );
      const userId = categoryDocument.user.$id;

      const promise = databases.updateDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_CATEGORY_ID,
        categoryId,
        {
          totalAmount: totalAmount,
        }
      );

      promise.then(
        (updatedCategoryDocument) => {
          console.log(updatedCategoryDocument);
          dispatch(fetchData(userId));
        },
        (error) => console.log(error)
      );
    });
  };
}

export function editExpense(expenseId, expenseDetails) {
  return function (dispatch) {
    const promise = databases.updateDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_EXPENSE_ID,
      expenseId,
      {
        ...expenseDetails,
      }
    );

    promise.then(
      (updatedExpenseDocument) => {
        console.log(updatedExpenseDocument);
        const categoryId = updatedExpenseDocument.category.$id;
        dispatch(reEvaluateCategoryTotalAmount(categoryId));
      },
      (error) => console.log(error)
    );
  };
}

export function deleteExpense() {
  return function (dispatch) {};
}
