const eventsList = document.getElementById("event_list");

const eventImages = {
    "Ganpati Festival":
        "https://images.unsplash.com/photo-1567591370504-80142b28f1c1?auto=format&fit=crop&fm=jpg&q=85&w=900",
    "Music Concert":
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",

    "Java Workshop":
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",

    "Tech Conference":
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",

    "Startup Meetup":
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        
    "Coding Hackathon":
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=85"
};

fetch("http://localhost:8081/api/events")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        return response.json();
    })
    .then(events => {

        console.log(events);

        eventsList.innerHTML = "";

        events.forEach(event => {

            const eventCard = document.createElement("div");

            eventCard.className = "event-card";

            const image =
                eventImages[event.name] ||
                "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85";

            eventCard.innerHTML = `
                <img
                    class="event-image"
                    src="${image}"
                    alt="${event.name}"
                >

                <div class="event-content">

                    <h3>${event.name}</h3>

                    <p>
                        <strong>Location:</strong>
                        ${event.location ?? "Location not available"}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${event.date}
                    </p>

                    <p class="event-price">
                        ₹${event.price}
                    </p>

                    <span class="ticket_info">
                        ${event.availableTickets} Tickets Available
                    </span>

                </div>
            `;

            eventsList.appendChild(eventCard);
        });

    })
    .catch(error => {

        console.error("Error:", error);

        eventsList.innerHTML =
            "<p>Unable to load events.</p>";
    });