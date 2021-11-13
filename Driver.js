const fs = require("fs");
const ShoppingCart = require("./ShoppingCart");

const rawFile = fs.readFileSync("./data/pricingRules.json");
const pricingRules = JSON.parse(rawFile);

const productCodes = pricingRules.products.map((product) => product.code);

const cart = ShoppingCart.new(pricingRules);

const showHelp = () => {
  console.log(`
Here the available commands for the shopping cart:

add <productCode> [promoCode] - add a single quantity for a single product
      (accepted product codes: ${productCodes}), promo code is just optional
items - show the total charged amount (promos already applies)
total - show the total charged amount (promos already applies)
exit - exit this interactive mode
help - display this help message again
`);
};

const handleAdd = (args) => {
  if (args.length && productCodes.includes(args[0])) {
    const [productCode, promoCode] = args;
    cart.add(productCode.toLowerCase(), promoCode);
    const withPromo = promoCode ? `and using promo code '${promoCode}'` : "";
    console.log(`Added ${productCode} ${withPromo}`);
  } else {
    console.log(
      "Unable to add item either missing arguments or invalid productCode"
    );
    console.log(`acceptable codes: ${productCodes}`);
  }
};

const requestInputPrompt = () => process.stdout.write("> ");

process.stdin.on("data", (input) => {
  const [command, ...args] = input
    .toString()
    .split(" ")
    .map((a) => a.trim());

  switch (command.toLowerCase()) {
    case "add":
      handleAdd(args);
      break;
    case "items":
      console.log(cart.items);
      break;
    case "total":
      console.log(cart.total);
      break;
    case "clear":
      cart.clear();
      console.log("cart cleared");
      break;
    case "exit":
      process.exit();
    case "help":
      showHelp();
      break;
    default:
      console.error('Invalid command: (Type "help" for more commands)');
  }
  requestInputPrompt();
});

process.on("exit", () => {
  console.log("bye");
});

console.log("Welcome to the interactive mode of the Shopping cart!");
showHelp();
requestInputPrompt();
