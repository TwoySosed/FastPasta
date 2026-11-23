export function createUUID() {
    const timestamp = Date.now().toString(36); // Время в 36-ричной системе (короче)
    const random = Math.random().toString(36).substring(2, 9); // Случайный хвост
    const UUID = `${timestamp}${random}`;
    return UUID
}

export const tags = [
    {
        id: 1,
        name: "Dark-Blue",
        color: "#3647e4"
    },
    {
        id: 2,
        name: "Yellow",
        color: "#facc15"
    },
    {
        id: 3,
        name: "Pink",
        color: "#f472b6"
    },
    {
        id: 4,
        name: "Red",
        color: "#ed2724"
    },
        {
        id: 5,
        name: "Green",
        color: "#1eec21"
    },
    {
        id: 6,
        name: "Orange",
        color: "#f97316"
    }
];