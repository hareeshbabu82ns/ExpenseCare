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
  const database = new sdk.Databases(client);

  const data = JSON.parse(req.payload);

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

    const { action, categoryId } = data;

    const promise = database.getDocument(
      req.variables["APPWRITE_DB_ID"],
      req.variables["APPWRITE_DB_CATEGORY_ID"],
      categoryId
    );

    promise.then(
      (categoryDocument) => {
        const { currYearExpense, currMonthExpense } = categoryDocument;
        let [updatedCurrYearExpense, updatedCurrMonthExpense] = [
          currYearExpense,
          currMonthExpense,
        ];
        const { amount } = data;

        switch (action) {
          case "ON_ADD_EXPENSE":
            updatedCurrYearExpense += amount;
            updatedCurrMonthExpense += amount;
            break;

          case "ON_REMOVE_EXPENSE":
            updatedCurrYearExpense -= amount;
            updatedCurrMonthExpense -= amount;
            break;

          case "ON_EDIT_EXPENSE":
            const { editedAmount } = data;
            updatedCurrYearExpense += editedAmount - amount;
            updatedCurrMonthExpense += editedAmount - amount;
            break;

          default:
            break;
        }

        const promise = database.updateDocument(
          req.variables["APPWRITE_DB_ID"],
          req.variables["APPWRITE_DB_CATEGORY_ID"],
          categoryId,
          {
            currYearExpense: updatedCurrYearExpense,
            currMonthExpense: updatedCurrMonthExpense,
          }
        );

        promise.then(
          (updatedDocument) => {
            console.log(updatedDocument);
            return res.json(updatedDocument);
          },
          (error) => {
            console.log(error);
            return res.json({ error });
          }
        );
      },
      (error) => {
        console.log(error);
        return res.json({ error });
      }
    );
  }
};
