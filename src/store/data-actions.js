import { ID, Query } from "appwrite";
import { account, databases, functions } from "../appwrite/appwrite-config";
import { dataActions } from "./data-slice";
import { filterActions } from "./filter-slice";

const actions = {
  ON_ADD_EXPENSE: "ON_ADD_EXPENSE",
  ON_REMOVE_EXPENSE: "ON_REMOVE_EXPENSE",
  ON_EDIT_EXPENSE: "ON_EDIT_EXPENSE",
};

/* To fetch data after any changes in the database or to fetch data into state on login*/
export function fetchData(userId) {
  return function (dispatch) {
    databases
      .listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_CATEGORY_ID,
        [Query.equal("userId", userId)]
      )
      .then((categories) => {
        console.log(categories);
        databases
          .listDocuments(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_DB_EXPENSE_ID,
            [Query.equal("userId", userId), Query.limit(5)]
          )
          .then((expenses) => {
            console.log(expenses);

            databases
              .getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_DB_USER_ID,
                userId
              )
              .then((userDocument) => {
                dispatch(
                  dataActions.setData({
                    expenses: expenses.documents,
                    categories: categories.documents,
                    userDocument,
                  })
                );
                dispatch(filterActions.setFilteredExpenses(expenses));
              });
          });
      });
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
            userId: userId,
          }
        );

        promise.then(
          (updatedCategoryDocument) => {
            console.log(updatedCategoryDocument);
            setTimeout(() => dispatch(fetchData(userId)), 3000);
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
        setTimeout(() => dispatch(fetchData(userId)), 3000);
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

        functions
          .createExecution(
            import.meta.env.VITE_FUNCTION_UPDATE_USER_ID,
            JSON.stringify({
              userId: userId,
            }),
            true
          )
          .then(
            (updatedUserDocument) => {
              setTimeout(() => dispatch(fetchData(userId)), 3000);
            },
            (error) => console.log(error)
          );
      },
      function (error) {
        console.log(error);
      }
    );
  };
}

/* To add an expense to a particular category (also updates the totalAmount of that category and fetch the updated data into the state) */
export function addExpense(userId, categoryId, expenseDetails) {
  return function (dispatch) {
    const { amount, name, description } = expenseDetails;

    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const time = date.getTime();

    date = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // creating a new expense document
    const promise = databases.createDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_EXPENSE_ID,
      ID.unique(),
      {
        amount,
        name,
        description,
        date,
        year,
        month,
        category: categoryId,
        user: userId,
        categoryId,
        userId,
        time: time,
      }
    );

    promise.then(
      (createdExpenseDocument) => {
        // updating total amount in category collection

        console.log(createdExpenseDocument);

        functions
          .createExecution(
            import.meta.env.VITE_FUNCTION_UPDATE_CATEGORY_ID,
            JSON.stringify({
              action: actions.ON_ADD_EXPENSE,
              categoryId: categoryId,
              amount: amount,
            }),
            true
          )
          .then(
            (updatedCategoryDocument) => {
              console.log(updatedCategoryDocument);

              // updating the total amount in user collection
              functions
                .createExecution(
                  import.meta.env.VITE_FUNCTION_UPDATE_USER_ID,
                  JSON.stringify({
                    userId: userId,
                  }),
                  true
                )
                .then(
                  (updatedUserDocument) => {
                    setTimeout(() => dispatch(fetchData(userId)), 3000);
                  },
                  (error) => console.log(error)
                );
            },
            (error) => console.log(error)
          );
      },
      (error) => console.log(error)
    );
  };
}

/* To edit an expense details (aslo updates the corresponding category's totalAmount and fetches the updated data into the state) */
export function editExpense(expenseId, expenseDetails, oldAmount) {
  return function (dispatch) {
    // updating the expense document
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
        const userId = updatedExpenseDocument.user.$id;

        const { year, month } = updatedExpenseDocument;
        const [currYear, currMonth] = [
          new Date().getFullYear(),
          new Date().getMonth(),
        ];
        const updateYearAmount = year === currYear;
        const updateMonthAmount = month === currMonth;

        if (updateYearAmount || updateMonthAmount) {
          // updating the category document's totalAmount

          functions
            .createExecution(
              import.meta.env.VITE_FUNCTION_UPDATE_CATEGORY_ID,
              JSON.stringify({
                action: actions.ON_EDIT_EXPENSE,
                categoryId: categoryId,
                amount: oldAmount,
                editedAmount: expenseDetails.amount,
                updateYearAmount: updateYearAmount,
                updateMonthAmount: updateMonthAmount,
              }),
              true
            )
            .then(
              (updatedCategoryDocument) => {
                console.log(updatedCategoryDocument);

                functions
                  .createExecution(
                    import.meta.env.VITE_FUNCTION_UPDATE_USER_ID,
                    JSON.stringify({
                      userId: userId,
                    }),
                    true
                  )
                  .then(
                    (updatedUserDocument) => {
                      setTimeout(() => dispatch(fetchData(userId)), 3000);
                    },
                    (error) => console.log(error)
                  );
              },
              (error) => console.log(error)
            );
        }
      },
      (error) => console.log(error)
    );
  };
}

/* To delete an expense (also fetches the updated data into the state) */
export function removeExpense(expenseId, expenseDetails) {
  return function (dispatch) {
    const { year, month, categoryId, userId, amount } = expenseDetails;

    // deleting an expense document
    const promise = databases.deleteDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_EXPENSE_ID,
      expenseId
    );

    promise.then(
      () => {
        const [currYear, currMonth] = [
          new Date().getFullYear(),
          new Date().getMonth(),
        ];

        const updateYearAmount = year === currYear;
        const updateMonthAmount = month === currMonth;

        if (updateYearAmount || updateMonthAmount) {
          // updating the totalExpense of category document

          functions
            .createExecution(
              import.meta.env.VITE_FUNCTION_UPDATE_CATEGORY_ID,
              JSON.stringify({
                action: actions.ON_REMOVE_EXPENSE,
                categoryId: categoryId,
                amount: amount,
                updateYearAmount: updateYearAmount,
                updateMonthAmount: updateMonthAmount,
              }),
              true
            )
            .then(
              (updatedCategoryDocument) => {
                console.log(updatedCategoryDocument);

                // removing expense from user's total Expense
                functions
                  .createExecution(
                    import.meta.env.VITE_FUNCTION_UPDATE_USER_ID,
                    JSON.stringify({
                      userId: userId,
                    }),
                    true
                  )
                  .then(
                    (updatedUserDocument) => {
                      setTimeout(() => dispatch(fetchData(userId)), 3000);
                    },
                    (error) => console.log(error)
                  );
              },
              (error) => console.log(error)
            );
        }
      },
      (error) => console.log(error)
    );
  };
}
