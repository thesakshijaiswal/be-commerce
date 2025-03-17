import { Button } from "../components";
const OrderSummaryPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-secondary">
      <h1 className="mb-6 ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Place Your Order
      </h1>
      <div className="w-full max-w-6xl rounded-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-40 rounded-lg bg-primary/5 p-4 shadow-md">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              <p className="mt-4 text-sm text-gray-600">John Doe</p>
              <p className="text-sm text-gray-600">
                123 Main Street, City, Country
              </p>
              <p className="text-sm text-gray-600">Postal Code: 56789</p>
            </div>
            <div className="rounded-lg bg-primary/5 p-4 shadow-md">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <p className="text-sm text-gray-600">Credit Card</p>
              <p className="text-sm text-gray-600">**** **** **** ****</p>
            </div>
          </div>
          <div className="rounded-lg bg-secondary/5 p-4 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Product A</td>
                  <td className="py-2 text-center">2</td>
                  <td className="py-2 text-right">$40</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Product B</td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">$20</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total:</span>
              <span>$60</span>
            </div>
            <Button className="mt-4 w-full">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
