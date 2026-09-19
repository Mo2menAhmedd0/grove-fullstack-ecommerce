const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();

  return result.data;
}

export async function getProduct(slug: string) {
  const response = await fetch(`${API_URL}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await response.json();

  return result.data;
}

export async function createOrder(orderData: unknown) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orderData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create order");
  }

  return result.data;
}

export async function getOrder(id: string) {
  const response = await fetch(`/api/orders/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch order");
  }

  return result.data;
}

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
};

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to register");
  }

  return result.data as AuthUser;
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to login");
  }

  return result.data as AuthUser;
}

export async function logoutUser() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to logout");
  }

  return result;
}

export async function getCurrentUser() {
  console.log("GET CURRENT USER")

  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  })

  const result = await response.json()

  console.log("GET CURRENT USER RESPONSE:", response.status)

  if (!response.ok) {
    throw new Error(result.message || "Not authenticated")
  }

  return result.data as AuthUser
}
export async function getMyOrders() {
  const response = await fetch("/api/orders", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch orders");
  }

  return result.data;
}

export async function getAdminOrders() {
  const response = await fetch("/api/orders/admin", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch orders");
  }

  return result.data;
}

export async function updateOrderStatus(id: string, status: string) {
  const response = await fetch(`/api/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update order status");
  }

  return result.data;
}
export async function deleteProduct(id: string) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete product");
  }

  return result.data;
}

export async function cancelOrder(id: string) {
  const response = await fetch(`/api/orders/${id}/cancel`, {
    method: "PATCH",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel order");
  }

  return result;
}
