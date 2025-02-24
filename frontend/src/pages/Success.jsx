import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <Link to="/home">Go to Homepage</Link>
    </div>
  );
}

export default SuccessPage;
