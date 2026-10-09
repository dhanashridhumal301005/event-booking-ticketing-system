
const eventsList = document.getElementById("event_list");

const API_EVENTS = "http://localhost:8081/api/events";
const API_BOOKINGS = "http://localhost:8081/api/bookings/book";

// Get the currently logged-in user's ID
function getLoggedInUserId() {
    return Number(
        sessionStorage.getItem("loggedInUserId") ||
        localStorage.getItem("loggedInUserId") ||
        0
    );
}

const eventImages = {
    "Ganpati Festival":
        "https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&fm=jpg&q=85&w=900",
    "Music Concert":
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    "Java Workshop":
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    "Advanced Java Workshop":
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    "Tech Conference":
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
    "Startup Meetup":
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
    "Coding Hackathon":
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=85"
};

async function loadEvents() {
    eventsList.innerHTML = "<p>Loading events...</p>";

    try {
        const response = await fetch(API_EVENTS);

        if (!response.ok) {
            throw new Error("Could not load events.");
        }

        const events = await response.json();
        eventsList.innerHTML = "";

        if (!events.length) {
            eventsList.innerHTML =
                "<p>No events available currently.</p>";
            return;
        }

        events.forEach(event => {
            const card = document.createElement("article");
            card.className = "event-card";

            const image = eventImages[event.name] ||
                "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85";

            const price = Number(event.price);
            const available = Number(event.availableTickets);

            card.innerHTML = `
                <img
                    class="event-image"
                    src="${image}"
                    alt="${event.name}"
                    loading="lazy"
                >

                <div class="event-content">
                    <h3>${event.name}</h3>

                    <p>
                        <strong>Location:</strong>
                        ${event.location || "Not specified"}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${event.date || "Not specified"}
                    </p>

                    <p class="event-price">
                        ₹${price.toFixed(2)}
                        <small>/ ticket</small>
                    </p>

                    <span class="ticket_info">
                        ${available} Tickets Available
                    </span>

                    <div class="booking-controls">
                        <label for="qty-${event.id}">
                            Number of Tickets
                        </label>

                        <input
                            type="number"
                            id="qty-${event.id}"
                            class="ticket-quantity"
                            min="1"
                            max="${available}"
                            step="1"
                            value="${available > 0 ? 1 : 0}"
                            ${available < 1 ? "disabled" : ""}
                        >

                        <p class="total-price">
                            Total: ₹<span class="total-amount">${available > 0 ? price.toFixed(2) : "0.00"}</span>
                        </p>

                        <button
                            type="button"
                            class="book-btn"
                            ${available < 1 ? "disabled" : ""}
                        >
                            ${available < 1 ? "Sold Out" : "Book Tickets"}
                        </button>

                        <p class="booking-message" role="status"></p>
                    </div>
                </div>
            `;

            const quantityInput =
                card.querySelector(".ticket-quantity");
            const totalAmount =
                card.querySelector(".total-amount");
            const bookButton =
                card.querySelector(".book-btn");
            const message =
                card.querySelector(".booking-message");
            const ticketInfo =
                card.querySelector(".ticket_info");

            // Calculate total price automatically
            quantityInput.addEventListener("input", () => {
                const quantity = Number(quantityInput.value);

                totalAmount.textContent =
                    Number.isInteger(quantity) &&
                    quantity >= 1 &&
                    quantity <= available
                        ? (price * quantity).toFixed(2)
                        : "0.00";

                message.textContent = "";
                message.classList.remove("success-message");
            });

            // Book tickets
            bookButton.addEventListener("click", async () => {
                const userId = getLoggedInUserId();
                const quantity = Number(quantityInput.value);

                // Check login
                if (!Number.isInteger(userId) || userId <= 0) {
                    message.textContent =
                        "Please login before booking.";

                    bookButton.disabled = false;
                    quantityInput.disabled = false;
                    bookButton.textContent = "Book Tickets";
                    return;
                }

                // Validate ticket quantity
                if (
                    !Number.isInteger(quantity) ||
                    quantity < 1
                ) {
                    message.textContent =
                        "Please enter a valid ticket quantity.";
                    return;
                }

                if (quantity > available) {
                    message.textContent =
                        `Only ${available} tickets are available.`;
                    return;
                }

                bookButton.disabled = true;
                quantityInput.disabled = true;
                bookButton.textContent = "Booking...";
                message.textContent = "";

                try {
                    const bookingResponse = await fetch(
                        API_BOOKINGS,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userId: userId,
                                eventId: Number(event.id),
                                numberOfTickets: quantity
                            })
                        }
                    );

                    const responseText =
                        await bookingResponse.text();

                    if (!bookingResponse.ok) {
                        throw new Error(
                            responseText ||
                            "Booking failed. Please try again."
                        );
                    }

                    let booking;

                    try {
                        booking = JSON.parse(responseText);
                    } catch {
                        throw new Error(
                            "Booking response could not be read."
                        );
                    }

                    // Show success message
                    message.textContent =
                        `Booking successful! Booking ID: ${booking.id}`;

                    message.classList.add("success-message");

                    // Update availability on this card
                    const remaining = Math.max(
                        0,
                        available - quantity
                    );

                    ticketInfo.textContent =
                        `${remaining} Tickets Available`;

                    quantityInput.max = remaining;
                    quantityInput.value =
                        remaining > 0 ? "1" : "0";

                    quantityInput.disabled = remaining < 1;

                    totalAmount.textContent =
                        remaining > 0
                            ? price.toFixed(2)
                            : "0.00";

                    bookButton.disabled = remaining < 1;
                    bookButton.textContent =
                        remaining < 1
                            ? "Sold Out"
                            : "Book Tickets";

                } catch (error) {
                    console.error("Booking error:", error);

                    message.textContent =
                        error.message ||
                        "Unable to book tickets. Please try again.";

                    bookButton.disabled = false;
                    bookButton.textContent = "Book Tickets";
                    quantityInput.disabled = false;
                }
            });

            eventsList.appendChild(card);
        });

    } catch (error) {
        console.error("Event loading error:", error);

        eventsList.innerHTML = `
            <p>
                Unable to load events.
                Please check whether Spring Boot is running
                on port 8081.
            </p>
        `;
    }
}

loadEvents();