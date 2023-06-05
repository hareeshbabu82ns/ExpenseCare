import { ID } from "appwrite";
import { databases } from "../appwrite/appwrite-config";
import { dataActions } from "./data-slice";

/* To fetch data after any changes in the database or to fetch data into state on login*/
export function fetchData(userId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    // extract current month
    // category  ->  monthAmount -> compute data

    promise.then(
      (userDocument) => {
        console.log(userDocument);
        dispatch(dataActions.setCartData(userDocument));
      },
      (error) => console.log(error)
    );
  };
}

/* To add a new category */
export function addCategory(userId, categoryName) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    promise.then(
      (userDocument) => {
        const categoryExists = userDocument.categories.find(
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

/* To edit an existing category name */
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

/* To delete a category and all its related documents i.e. expenses and its reference in user collection */
export function deleteCategory(userId, categoryId) {
  return function (dispatch) {
    const promise = databases.deleteDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_CATEGORY_ID,
      categoryId
    );

    promise.then(
      function (response) {
        console.log(response);
        dispatch(fetchData(userId));
      },
      function (error) {
        console.log(error);
      }
    );
  };
}

/* To revaluate the totalAmount of a category if any action like adding, editing or deleting expense happened in that particular category */
export function reEvaluateCategoryTotalAmount(categoryId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_CATEGORY_ID,
      categoryId
    );

    promise.then((categoryDocument) => {
      const initialValue = 0;
      const totalAmount = categoryDocument.expenses.reduce(
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

/*TO BE COMPLETED */
export function reEvaluateCategoriesMonthAmount(userId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    promise.then((userDocument) => {
      const categories = userDocument.category;

      categories.forEach(updateCategoryMonthAmount);

      function updateCategoryMonthAmount(category) {
        const id = category.$id;
      }
    });
  };
}

/* To add an expense to a particular category (also updates the totalAmount of that category and fetch the updated data into the state) */
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
        date: new Date().toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
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

/* To edit an expense details (aslo updates the corresponding category's totalAmount and fetches the updated data into the state) */
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

/* To delete an expense (also fetches the updated data into the state) */
export function deleteExpense() {
  return function (dispatch) {};
}
