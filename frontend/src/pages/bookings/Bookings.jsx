import { useEffect, useState } from "react";

import "./Bookings.css"; // ✅ Import CSS
import { getAllBookings } from "../../api/bookingService";


function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings from backend API
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        if (data.status === "success") {
          setBookings(data.message); // Store bookings in state
        } else {
          console.error("Failed to fetch bookings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) return <p className="loading">Loading bookings...</p>;

  return (
    <div className="bookings-container">
      <h2>All Bookings</h2>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <div className="booking-info">
              <h3>{booking.product?.name}</h3>
              <p>
                <strong>Brand:</strong> {booking.product?.brand}
              </p>
              <p>
                <strong>User:</strong> {booking.user?.name} (
                {booking.user?.email})
              </p>
            </div>
            {booking.product?.productImages?.length > 0 && (
              <img
                src={booking.product.productImages[0]}
                alt={booking.product.name}
                className="product-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
