import { Query } from "appwrite";

const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const database = new sdk.Databases(client);

  const categoryId = req.payload.categoryId;

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);

    if (req.type === "ON_ADD_EXPENSE" || req.type === "ON_REMOVE_EXPENSE") {
      const expenseAmount = req.payload?.amount || 0;

      const promise = database.getDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_CATEGORY_ID,
        categoryId
      );

      promise.then(
        (categoryDocument) => {
          const currMonthExpense = categoryDocument.currMonthExpense;

          const promise = database.updateDocument(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_DB_CATEGORY_ID,
            categoryId,
            {
              currMonthExpense:
                req.type === "ON_ADD_EXPENSE"
                  ? currMonthExpense + expenseAmount
                  : currMonthExpense - expenseAmount,
            }
          );

          promise.then(
            (updateDocument) => {},
            (error) => console.log(error)
          );
        },
        (error) => console.log(error)
      );
    } else if (req.type === "ON_EDIT_EXPENSE") {
      const { userId } = req.payload;

      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      const promise = database.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_EXPENSE_ID,
        [
          Query.equal("userId", userId),
          Query.equal("categoryId", categoryId),
          Query.equal("year", currYear),
          Query.equal("month", currMonth),
        ]
      );

      promise.then((documentsList) => {
        const currMonthCategoryExpense = documentsList.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        const promise = database.updateDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_CATEGORY_ID,
          categoryId,
          {
            currMonthExpense: currMonthCategoryExpense,
          }
        );

        promise.then(
          () => {},
          (error) => console.log(error)
        );
      });
    }
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
