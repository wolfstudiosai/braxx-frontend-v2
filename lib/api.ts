export async function getProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-slug": "braxxusa",
      },

      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const response = await res.json();
    return response?.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getSingleProduct(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-slug": "braxxusa",
      },

      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const response = await res.json();
    return response?.data || {};
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function CreateNewsLetter(email: string) {
  const res = await fetch(`/api/news-letter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const response = await res.json();
  return response;
}

export async function CreateContact(data: { name: string, email: string, subject: string, message: string }) {
  const res = await fetch(`/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  return response;
}

type RideRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  variantId: string;
}

export async function CreateRideRequest(data: RideRequestData) {
  const res = await fetch(`/api/ride-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  return response;
}

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  variantId: string;
  quantity: number;
  amount: number;
  currency: string;
}

export async function CreateOrder(data: OrderData) {
  const res = await fetch(`/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  return response;
}